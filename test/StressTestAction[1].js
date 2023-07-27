import axios from 'axios';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const test = async (count) => {
    while (count > 0) {
        const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
        const companyName = uniqueNamesGenerator({ dictionaries: [adjectives, colors] });
        const data = JSON.stringify({
            "formId": "64c0fb7534d98b33a66fbaf6",
            "response": [
                randomName,
                `sanyambhaskar5@gmail.com`,
                getRndInteger(18, 55),
                companyName,
                "Male",
                getRndInteger(30000, 300000),
                getRndInteger(5000, 25000),
                ""
            ]
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/form/submit',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
        count = count - 1;
    }


}

test(100);