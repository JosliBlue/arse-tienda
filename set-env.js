const fs = require('fs');

// Ruta del archivo que vamos a sobrescribir
const targetPath = './src/env.ts';

// Leemos las variables del sistema (process.env)
// Si no existen en el hosting, usamos valores por defecto
const envConfigFile = `export const env = {
    production: ${process.env.APP_PROD_ENV || 'false'},
    apiUrl: '${process.env.API_URL || 'http://localhost/api'}',
    leagueName: '${process.env.LEAGUE_NAME || 'Nombre desde set-env'}',
    firebaseConfig: {
        apiKey: '${process.env.FIREBASE_API_KEY || ''}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || ''}',
        projectId: '${process.env.FIREBASE_PROJECT_ID || ''}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || ''}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}',
        appId: '${process.env.FIREBASE_APP_ID || ''}',
    },
} as const;
`;

console.log('Generando archivo de entorno...');

try {
    fs.writeFileSync(targetPath, envConfigFile, 'utf8');
    console.log(`Archivo generado en ${targetPath}`);
} catch (err) {
    console.error('Error al escribir el archivo:', err);
    process.exit(1);
}
