import { createWriteStream } from "fs";
import { join } from "path";
import { useRuntimeConfig } from "#imports";
import { exec } from "child_process";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  let is_pair = true;
  let transplantation_type = true;
  let min_dp = null;
  let max_dp = null;
  let min_ad = null;
  let homozigosity_thr = null;
  let gnomad_af = null;
  let min_gq = null;
  let base_length = null;
  let run_name = "";
  let ns = false;
  let full = true;
  let pairRecipientFile = null;
  let pairDonorFile = null;
  let cohortMergedFile = null;
  let cohortDonorRecipientListFile = null;
  let pair = "";
  let sample = false;
  // Objet pour stocker les valeurs des champs de données
  const formValues = {};

  // Fonction pour décoder le Buffer
  const decodeBuffer = (buffer) => {
    return buffer.toString("utf-8");
  };
  let filesUploadedPaths = [];
  // Parcourir les champs reçus dans le formulaire
  formData?.forEach((field) => {
    // Ignorer les champs de type fichier
    if (!field.filename) {
      formValues[field.name] = decodeBuffer(field.data);
    } else {
      let p = handleFileUpload(field);
      filesUploadedPaths.push(p);
    }
  });

  console.log("Valeurs des champs du formulaire:", formValues);
  const runtimeConfig = useRuntimeConfig(event);
  const pipelinePath = runtimeConfig.public.PIPELINE;
  const pythonPath = runtimeConfig.public.PYTHON;
  let command = `cd ${pipelinePath}/src && ${pythonPath} ${pipelinePath}/src/ams_pipeline.py -f`;

  if (formValues["run_name"] && formValues["run_name"].length > 0) {
    command += ` -n ${formValues["run_name"]}`;
  }

  if (formValues["pair"] && formValues["pair"].length > 0) {
    command += ` -p ${formValues["pair"]}`;
  }

  if (formValues["min_dp"] !== null) {
    command += ` --min_dp ${formValues["min_dp"]}`;
  }

  if (formValues["max_dp"] !== null) {
    command += ` --max_dp ${formValues["max_dp"]}`;
  }

  if (formValues["min_ad"] !== null) {
    command += ` --min_ad ${formValues["min_ad"]}`;
  }

  if (formValues["homozigosity_thr"] !== null) {
    command += ` -t ${formValues["homozigosity_thr"]}`;
  }

  if (formValues["gnomad_af"] !== null) {
    command += ` --gnomad_af ${formValues["gnomad_af"]}`;
  }

  if (formValues["min_gq"] !== null) {
    command += ` --min_gq ${formValues["min_gq"]}`;
  }

  if (formValues["base_length"] !== null) {
    command += ` -l ${formValues["base_length"]}`;
  }

  if (formValues["ns"]) {
    command += ` -ns`;
  }

  if (formValues["full"]) {
    command += ` -f`;
  }

  if (formValues["sample"]) {
    command += ` ${pipelinePath}/tutorial/donor_annotated_VEP.vcf ${pipelinePath}/tutorial/recipient_annotated_VEP.vcf`;
  } else {
    filesUploadedPaths.forEach((index, item) => {
      command += ` ${item}`;
    });
  }
  command += ` rd`;
  console.log(command);

  const res = await new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve({ message: "Command executed successfully", value: stdout });
      }
    });
  });

  return {
    status: "success",
    message: res,
    data: formValues,
  };
});

function handleFileUpload(field) {
  if (field && field.filename) {
    let path = process.cwd();
    switch (field.name) {
      case "pairDonorFile":
        path = join(path, "public/uploads/pair/donor");
        break;
      case "pairRecipientFile":
        path = join(path, "public/uploads/pair/recipient");
        break;
      case "cohortMergedFile":
        path = join(path, "public/uploads/cohort/merged");
        break;
      case "cohortDonorRecipientListFile":
        path = join(path, "public/uploads/cohort/list");
        break;
    }
    const filePath = join(path, field.filename);
    const fileStream = createWriteStream(filePath);
    fileStream.write(field.data);
    fileStream.end();
    return filePath;
    //return `/uploads/${field.filename}`;
  }
  return null;
}
