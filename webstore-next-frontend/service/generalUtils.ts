
export const formatCurrency = (num: number) => {
    if (num != undefined && num != null) {
        let numstr = String(num);
        numstr = numstr.replace(/,/g, "");
        var parts = numstr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts;
    } else return "";
}

export const formatDate_MM_DD_YY = (date: Date) =>
    date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

export const formatDate_MM_DD = (date: Date) =>
    date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });