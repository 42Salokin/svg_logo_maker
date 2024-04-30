const inquirer = require("inquirer");
const fs = require('fs');
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
    run() {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "text",
                    message: "What text would you like on your logo? Can only be up to three characters.",
                    validate: (text) =>
                        text.length <= 3 ||
                        "Remember, only up to three characters!",
                },
                {
                    type: "input",
                    name: "textColor",
                    message: "What color would you like the text?",
                },
                {
                    type: "list",
                    name: "shapeType",
                    message: "What shape would you like your logo?",
                    choices: "circle, square, triangle",
                },
                {
                    type: "input",
                    name: "shapeColor",
                    message: "What color would you like the shape?",
                }
            ])
            .then(({ text, textColor, shapeType, shapeColor }) => {
                let shape;
                switch (shapeType) {
                    case "circle":
                        shape = new Circle();
                        break;
                    case "square":
                        shape = new Square();
                
                    default:
                        shape = new Triangle();
                        break;
                }
                shape.setColor(shapeColor);

                const svg = new SVG();
                svg.setText(text, textColor);
                svg.setShape(shape);
                return writeFile("logo.svg", svg.render());
            })
    }
}