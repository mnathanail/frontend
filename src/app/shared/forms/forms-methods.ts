export class FormsMethods {

    static getDirtyValues(form: any): object {
        const dirtyValues = {};
        Object.keys(form.controls)
            .forEach(key => {
                const currentControl = form.controls[key];

                if (currentControl.dirty) {
                    if (currentControl.controls) {
                        dirtyValues[key] = this.getDirtyValues(currentControl);
                    } else {
                        dirtyValues[key] = currentControl.value;
                    }
                }
            });

        return dirtyValues;
    }
}
