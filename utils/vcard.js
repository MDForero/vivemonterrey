/**
 * Genera un archivo vCard (versión 3.0) con toda la información posible del usuario
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.name - Nombre completo
 * @param {string} [userData.firstName] - Nombre
 * @param {string} [userData.lastName] - Apellido
 * @param {string} [userData.middleName] - Segundo nombre
 * @param {string} [userData.prefix] - Prefijo (Sr., Dra., etc.)
 * @param {string} [userData.suffix] - Sufijo (Jr., III, etc.)
 * @param {string} [userData.job] - Trabajo/profesión
 * @param {string} [userData.company] - Empresa/organización
 * @param {string} [userData.department] - Departamento
 * @param {string} [userData.imgProfile] - URL de la imagen de perfil
 * @param {string} [userData.email] - Email principal
 * @param {Array} [userData.emails] - Lista de emails adicionales
 * @param {string} [userData.phone] - Teléfono principal
 * @param {Array} [userData.phones] - Lista de teléfonos
 * @param {Object} [userData.address] - Dirección
 * @param {string} [userData.website] - Sitio web personal
 * @param {string} [userData.birthday] - Fecha de nacimiento (YYYY-MM-DD)
 * @param {string} [userData.notes] - Notas adicionales
 * @param {Object} [userData.socials] - Redes sociales
 * @returns {string} Contenido del archivo vCard
 */
export function generateVCard(userData) {
    const { 
        name, firstName, lastName, middleName, prefix, suffix,
        job, company, department, imgProfile, 
        email, emails, phone, phones, 
        address, website, birthday, notes, socials 
    } = userData;

    // Separar nombre automáticamente si no se proporciona firstName/lastName
    let fName = firstName;
    let lName = lastName;
    let mName = middleName || '';
    
    if (!fName || !lName) {
        const nameParts = (name || '').split(' ');
        fName = fName || nameParts[0] || '';
        lName = lName || nameParts.slice(1).join(' ') || '';
    }

    // Construir el vCard
    let vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${name || `${fName} ${lName}`.trim()}
N:${lName};${fName};${mName};${prefix || ''};${suffix || ''}`;

    // Información profesional
    if (job) {
        vCardContent += `
TITLE:${job}`;
    }

    if (company) {
        vCardContent += `
ORG:${company}${department ? `;${department}` : ''}`;
    }

    // Información de contacto - Email
    if (email) {
        vCardContent += `
EMAIL;TYPE=PREF,INTERNET:${email}`;
    }

    if (emails && Array.isArray(emails)) {
        emails.forEach((emailItem, index) => {
            if (typeof emailItem === 'string') {
                vCardContent += `
EMAIL;TYPE=INTERNET:${emailItem}`;
            } else if (emailItem.email) {
                const type = emailItem.type || 'INTERNET';
                vCardContent += `
EMAIL;TYPE=${type}:${emailItem.email}`;
            }
        });
    }

    // Información de contacto - Teléfono
    if (phone) {
        vCardContent += `
TEL;TYPE=PREF,VOICE:${phone}`;
    }

    if (phones && Array.isArray(phones)) {
        phones.forEach((phoneItem) => {
            if (typeof phoneItem === 'string') {
                vCardContent += `
TEL;TYPE=VOICE:${phoneItem}`;
            } else if (phoneItem.number) {
                const type = phoneItem.type || 'VOICE';
                vCardContent += `
TEL;TYPE=${type}:${phoneItem.number}`;
            }
        });
    }

    // Dirección
    if (address) {
        const {
            street = '', city = '', state = '', 
            postalCode = '', country = '', 
            poBox = '', extendedAddress = '',
            type = 'HOME'
        } = address;
        
        vCardContent += `
ADR;TYPE=${type}:${poBox};${extendedAddress};${street};${city};${state};${postalCode};${country}`;
        
        // Etiqueta de dirección formateada
        const addressParts = [street, city, state, postalCode, country].filter(Boolean);
        if (addressParts.length > 0) {
            vCardContent += `
LABEL;TYPE=${type}:${addressParts.join(', ')}`;
        }
    }

    // Sitio web personal
    if (website) {
        vCardContent += `
URL;TYPE=HOME:${website}`;
    }

    // Fecha de nacimiento
    if (birthday) {
        // Convertir fecha a formato vCard (YYYY-MM-DD o YYYYMMDD)
        const cleanBirthday = birthday.replace(/-/g, '');
        vCardContent += `
BDAY:${cleanBirthday}`;
    }

    // Foto de perfil
    if (imgProfile) {
        vCardContent += `
PHOTO;VALUE=URI:${imgProfile}`;
    }

    // Redes sociales y URLs adicionales
    if (socials) {
        if (socials.facebook) {
            vCardContent += `
URL;TYPE=Facebook:${socials.facebook}`;
        }
        if (socials.instagram) {
            vCardContent += `
URL;TYPE=Instagram:${socials.instagram}`;
        }
        if (socials.twitter || socials.x) {
            vCardContent += `
URL;TYPE=Twitter:${socials.twitter || socials.x}`;
        }
        if (socials.linkedin) {
            vCardContent += `
URL;TYPE=LinkedIn:${socials.linkedin}`;
        }
        if (socials.github) {
            vCardContent += `
URL;TYPE=GitHub:${socials.github}`;
        }
        if (socials.tiktok) {
            vCardContent += `
URL;TYPE=TikTok:${socials.tiktok}`;
        }
        if (socials.youtube) {
            vCardContent += `
URL;TYPE=YouTube:${socials.youtube}`;
        }
        if (socials.whatsapp) {
            vCardContent += `
URL;TYPE=WhatsApp:${socials.whatsapp}`;
        }
        if (socials.telegram) {
            vCardContent += `
URL;TYPE=Telegram:${socials.telegram}`;
        }
        if (socials.discord) {
            vCardContent += `
URL;TYPE=Discord:${socials.discord}`;
        }
        if (socials.snapchat) {
            vCardContent += `
URL;TYPE=Snapchat:${socials.snapchat}`;
        }
        if (socials.pinterest) {
            vCardContent += `
URL;TYPE=Pinterest:${socials.pinterest}`;
        }
    }

    // Notas adicionales
    if (notes) {
        vCardContent += `
NOTE:${notes}`;
    }

    // Metadatos del vCard
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    
    vCardContent += `
REV:${timestamp}`;

    // Finalizar vCard
    vCardContent += `
END:VCARD`;

    return vCardContent;
}

/**
 * Crea y descarga un archivo vCard
 * @param {Object} userData - Datos del usuario
 * @param {string} fileName - Nombre del archivo (opcional)
 */
export function downloadVCard(userData, fileName) {
    const vCardContent = generateVCard(userData);
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });

    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = fileName || `${(userData.name || 'contacto').replace(/\s+/g, '_')}.vcf`;

    // Agregar el enlace al DOM temporalmente y hacer click
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Hook personalizado para manejar la descarga de vCard
 * @returns {Function} Función para descargar vCard
 */
export function useVCardDownload() {
    return (userData, fileName) => {
        if (typeof window !== 'undefined') {
            downloadVCard(userData, fileName);
        }
    };
}
