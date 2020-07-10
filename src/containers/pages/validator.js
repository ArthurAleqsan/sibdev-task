import { message } from "antd"

export const validateForm = (form) => {
    if (!form.name) {
        return message.error('Название схемы обязательно.');
    } else if (!form.fields[0]) {
        return message.error('Опишите хотя бы одно свойство.');
    }
    form.fields.map(fieldsObj => {

        if (!fieldsObj.key) {
            return message.error('Ключ обязателен.');
        } else if (!fieldsObj.label) {
            return message.error('Название обязательно.');
        } else if (!fieldsObj.type) {
            return message.error('Поле отоброжения обязателен.');
        } else {
            return 'ok';
        }
    });

}