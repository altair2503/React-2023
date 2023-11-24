export function convertSecondsToDate(seconds){
    const milliseconds = seconds * 1000;
    const dateObject = new Date(milliseconds);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Months are zero-based
    const year = dateObject.getFullYear();

    return `${day}.${month}.${year}`;
};