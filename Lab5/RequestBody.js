// src/Labs/Lab5/RequestBody.js

const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');

module.exports = function RequestBody(app) {
    // Middleware to parse JSON and XML data
    app.use(bodyParser.json());
    app.use(bodyParser.text({ type: 'application/xml' }));

    // Function to handle operations
    const calculate = (a, b, operation) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        let result = 0;

        switch (operation) {
            case 'add':
                result = numA + numB;
                break;
            case 'subtract':
                result = numA - numB;
                break;
            case 'multiply':
                result = numA * numB;
                break;
            case 'divide':
                if (numB !== 0) {
                    result = numA / numB;
                } else {
                    result = 'Cannot divide by zero';
                }
                break;
            default:
                result = 'Invalid operation';
        }

        return result;
    };

    // POST route for calculation with JSON request body
    app.post('/lab5/calculator', (req, res) => {
        const { a, b, operation } = req.body; // Expecting {a, b, operation} in the body
        const result = calculate(a, b, operation);
        res.json({ result });
    });

    // POST route for calculation with XML request body
    app.post('/lab5/calculator/xml', (req, res) => {
        const xmlData = req.body;

        // Parse XML to JSON using xml2js
        xml2js.parseString(xmlData, { trim: true }, (err, result) => {
            if (err) {
                return res.status(400).json({ error: 'Invalid XML format' });
            }

            const { a, b, operation } = result.params; // Expecting <params a="x" b="y" operation="op"/>
            const resultValue = calculate(a[0], b[0], operation[0]);
            res.json({ result: resultValue });
        });
    });
};
