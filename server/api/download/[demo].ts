// /server/api/download/[param].ts
import { promises as fs } from 'fs';
import path from 'path';
import archiver from 'archiver';
import { defineEventHandler, createError } from 'h3'; // Nuxt 3 API utilities

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
    const pipelinePath = runtimeConfig.public.PIPELINE;
    console.log(pipelinePath);
    
  const { demo }  = event.context.params;
console.log("param", demo);

    let filePath1:string = ""
    let filePath2: string = "";
    if(demo === "pair" ) {
        filePath1 = path.resolve(`${pipelinePath}/tutorial/donor_annotated_VEP.vcf`);
        filePath2 = path.resolve(`${pipelinePath}/tutorial/recipient_annotated_VEP.vcf`);
        
    }
    else if(demo === "cohort") {
        filePath1 = path.resolve(`${pipelinePath}/tutorial/donor_annotated_VEP.vcf`);
        filePath2 = path.resolve(`${pipelinePath}/tutorial/recipient_annotated_VEP.vcf`);
    }
  // Chemins des fichiers que vous voulez retourner

  // Vérifiez que les fichiers existent
  try {
    await fs.access(filePath1);
    await fs.access(filePath2);
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'One or both files not found'
    });
  }

  // Créer un stream pour l'archive ZIP
  const zipStream = archiver('zip', {
    zlib: { level: 9 } // Compression maximale
  });

  // Définir les headers pour renvoyer un fichier ZIP
  event.node.res.setHeader('Content-Disposition', 'attachment; filename="files.zip"');
  event.node.res.setHeader('Content-Type', 'application/zip');

  // Pipe l'archive vers la réponse HTTP
  zipStream.pipe(event.node.res);

  // Ajouter les deux fichiers à l'archive ZIP
    zipStream.file(filePath1, { name: filePath1 });
  zipStream.file(filePath2, { name:  filePath2 });

  // Finaliser l'archive et fermer le stream
    let res = await zipStream.finalize();
    return {
        value:res
    }
});