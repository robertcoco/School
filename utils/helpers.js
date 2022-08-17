module.exports = {
    renamePropertyOfObj(obj, oldName, newName) {
        if (oldName !== newName) {
            Object.defineProperty(
                obj, 
                newName,
                Object.getOwnPropertyDescriptor(obj, oldName)
            )
            delete obj[oldName];
        }
    }
}