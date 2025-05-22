import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Blog ",
            version: "1.0.0",
            description: "API para blog personal",
            contact:{
                name: "Harol Rodriguez",
                email: "hrodriguez-2023278@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/blog-personal/v1"
            }
        ]
    },
    apis:[
        "./src/courses/*.js",
        "./src/post/*.js",
        "./src/comment/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUI}