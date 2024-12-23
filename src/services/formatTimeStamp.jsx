export function formatDate(dateTimeString) {
    if (!dateTimeString) {
        return "Invalid Date"; 
    }
    const date = new Date(dateTimeString+ 'T00:00:00Z');
    if (isNaN(date.getTime())) {
        return "Invalid Date"; 
    }
    
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}${month}${year}`;
}
export function formatDateForSetting(dateTimeString) {
    console.log(dateTimeString);
    
    if (!dateTimeString) {
        return "Invalid Date"; 
    }
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
        return "Invalid Date"; 
    }
    
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
}
export function formatTime(dateTimeString) {
    if (!dateTimeString) {
        return "Invalid Date"
    }
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(date);
}
// export function formatDateTime(dateTimeString){
//     if (!dateTimeString) {
//         return "Invalid Date"
//     }
//     const date = new Date(dateTimeString);
//     if (isNaN(date.getTime())) {
//         return "Invalid Date";
//     }
//     return new Intl.DateTimeFormat('en-US', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',

//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true
//     }).format(date);
    
// }
export function formatDateTime(dateTimeString) {
    if (!dateTimeString) {
        return "Invalid Date";
    }
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    const time = timeFormatter.format(date);
    return `${day}-${month}-${year} ${time}`;
}
export function formatDateTimeSlash(dateTimeString) {
    if (!dateTimeString) {
        return "Invalid Date";
    }
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const time = timeFormatter.format(date);
    return `${year}/${month}/${day} ${time}`;
}
export function yyMMdd(dateTimeString) {
    if (!dateTimeString) {
        return "Invalid Date";
    }
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${year}/${month}/${day}`;
}
export function formatDateToSetting(dateTimeString) {
    if (!dateTimeString) {
        return "Invalid Date";
    }
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    const formattedDate = date.toISOString().replace('T', ' ').slice(0, -1);
    console.log(formatDate);
    
    return formattedDate;
}

