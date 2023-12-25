
export function convertObjectsToJson(canvasItems: Record<string, any>[]) {
    return canvasItems.map(element => {
        const commonFields = {
            type: element.type,
            id: element.id,
            xPos: element.xPos,
            yPos: element.yPos,
            order: element.order,
            rotation: "ROTATE_" + element.rotation
        };

        switch (element.type) {
            case "Text":
                return {
                    ...commonFields,
                    text: element.content,
                    fontFamily: element.attributes.style.fontFamily,
                    size: parseFloat(element.attributes.style.fontSize)
                };
            case "Counter":
                return {
                    ...commonFields,
                    type: "CounterText",
                    size: parseFloat(element.attributes.style.fontSize),
                    start_value: parseInt(element.content),
                    end_value: 1000,
                    pulse_value: 1,
                    step_value: 1,
                    current_value: parseInt(element.content)
                };
            case "Barcode":
                return {
                    ...commonFields,
                    text: element.attributes.value,
                    height: element.attributes.height,
                    size: element.attributes.width,
                    show_text: true,
                    text_size: element.attributes.fontSize
                };
            case "Circle":
                return {
                    ...commonFields,
                    size: 1, // Assuming size is a constant value
                    width: element.width,
                    height: element.height
                };
            case "Rectangle":
                return {
                    ...commonFields,
                    size: 1, // Assuming size is a constant value
                    width: element.width,
                    height: element.height
                };
            case "Line":
                return {
                    ...commonFields,
                    size: 1, // Assuming size is a constant value
                    width: element.width,
                    height: element.height
                };
            default:
                return commonFields;
        }
    });
}

export {}