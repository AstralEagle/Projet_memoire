export const getGeoLocation = async () => {
    if (navigator.geolocation) {
        try {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            return {
                long: pos.coords.longitude,
                lat: pos.coords.latitude,
            };
        } catch (error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.error("L'utilisateur a refusé la demande de géolocalisation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Les informations de géolocalisation ne sont pas disponibles.");
                    break;
                case error.TIMEOUT:
                    console.error("La demande de géolocalisation a expiré.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.error("Une erreur inconnue s'est produite.");
                    break;
                default:
                    break;
            }
        }
    } else {
        console.error("La géolocalisation n'est pas supportée par ce navigateur.");
    }
    return {lat: 0, long:0}
}