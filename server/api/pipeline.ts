import { createWriteStream } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
console.log(formData);
  let is_pair = true
  let transplantation_type = true
  let min_dp = null
  let max_dp = null
  let min_ad = null
  let homozigosity_thr = null
  let gnomad_af = null
  let min_gq = null
  let base_length = null
  let run_name = ""
  let ns = false
  let full = true
  let pairRecipientFile = null
  let pairDonorFile = null
  let cohortMergedFile = null
  let cohortDonorRecipientListFile = null
  let pair = ""
  let sample = false
  // Objet pour stocker les valeurs des champs de données
  const formValues = {}


  // Fonction pour décoder le Buffer
  const decodeBuffer = (buffer) => {
    return buffer.toString('utf-8')
  }

  // Parcourir les champs reçus dans le formulaire
  formData?.forEach((field) => {
    // Ignorer les champs de type fichier
    if (!field.filename) {
      formValues[field.name] = decodeBuffer(field.data)
    } else {
      handleFileUpload(field)
    }
  })

  console.log("Valeurs des champs du formulaire:", formValues)

  return {
    status: 'success',
    message: 'Données du formulaire reçues avec succès',
    data: formValues
  }})

function handleFileUpload(field) {
  if (field && field.filename) {
    let path = process.cwd();
    switch (field.name) {
      case 'pairDonorFile':
        path = join(path, 'public/uploads/pair/donor')
        break
      case 'pairRecipientFile':
        path = join(path, 'public/uploads/pair/recipient')
        break
      case 'cohortMergedFile':
        path = join(path, 'public/uploads/cohort/merged')
        break
      case 'cohortDonorRecipientListFile':
        path = join(path, 'public/uploads/cohort/list')
        
        break
    }
    const filePath = join(path, field.filename)
    const fileStream = createWriteStream(filePath)
    fileStream.write(field.data)
    fileStream.end()
    return `/uploads/${field.filename}`
  }
  return null
}




// export default defineEventHandler(async (event) => {
//   const form = await readMultipartFormData(event)
// console.log(form);
//   if (!form) {
//     return { status: 'error', message: 'No form data received' }
//   }

//   // Initialisation des variables avec des valeurs par défaut
//   let is_pair = true
//   let transplantation_type = true
//   let min_dp = null
//   let max_dp = null
//   let min_ad = null
//   let homozigosity_thr = null
//   let gnomad_af = null
//   let min_gq = null
//   let base_length = null
//   let run_name = ""
//   let ns = false
//   let full = true
//   let pairRecipientFile = null
//   let pairDonorFile = null
//   let cohortMergedFile = null
//   let cohortDonorRecipientListFile = null
//   let pair = ""

//   // Objet pour stocker les valeurs des champs de données
//   const formValues = {}


//   // Fonction pour décoder le Buffer
//   const decodeBuffer = (buffer) => {
//     return buffer.toString('utf-8')
//   }

//   // Parcourir les champs reçus dans le formulaire
//   form.forEach((field) => {
//     // Ignorer les champs de type fichier
//     if (!field.filename) {
//       formValues[field.name] = decodeBuffer(field.data)
//     }
//   })

//   console.log("Valeurs des champs du formulaire:", formValues)

//   return {
//     status: 'success',
//     message: 'Données du formulaire reçues avec succès',
//     data: formValues
//   }})

// // Fonction pour gérer les uploads de fichiers
