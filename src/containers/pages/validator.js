import { message } from "antd"

export const validateForm = (form) => {
    if (!form.name) {
        return message.error('Название схемы обязательно.');
    }
    if (!form.fields[0]) {
        return message.error('Опишите хотя бы одно свойство.');
    }
    form.fields.map(fieldsObj => {

        if (!fieldsObj.key) {
            return message.error('Ключ обязателен.');
        }
        if (!fieldsObj.label) {
            return message.error('Название обязательно.');
        }
        if (!fieldsObj.type) {
            return message.error('Поле отоброжения обязателен.');
        }
    });
}