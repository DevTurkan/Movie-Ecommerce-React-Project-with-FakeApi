import moment from "moment";

export const dateFormatter = (date=new Date(), format="DD.MM.YYYY HH:mm") => {
    return moment(date, format).format(format);
}

export const financial = (get_val:string) => {
    let val=get_val?.toString().replace(/\s/g, '');

    if (!isNaN(val)){

        val=Number.parseFloat(val).toFixed(2);

        let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
        let len = num.toString().length;
        let result = '';
        let count = 1;

        for (let i = len - 1; i >= 0; i--) {
            result = num.toString()[i] + result;
            if (count % 3 === 0 && count !== 0 && i !== 0) {
                result = ' ' + result;
            }
            count++;
        }

        // return the number with decimal point if it exists
        return  val.toString().includes('.') ? (result + '.' + val.toString().split('.')[1]) : result;

    }

}

export const addStr = (str, index=29, stringToAdd='...') =>{
    let convert_str=String(str).toString();
    return (convert_str.length > index ) ? convert_str.substring(0, index) + stringToAdd : convert_str;
}

export const resetForm = (formRef) => {
    let get_form=formRef.current;
    get_form.resetFields();
}

