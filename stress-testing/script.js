import http from 'k6/http';
import { check, sleep } from 'k6';

const RPS = 10;
const Duration = '10s';
const PreAllocatedVUs = 100;
const MaxVUs = 2000;

export let options = {
    scenarios: {
        llmlingua: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'llmlingua',
        },
        // searchAPI: {
        //     executor: 'constant-arrival-rate',
        //     rate: RPS,
        //     timeUnit: '1s',
        //     duration: Duration,
        //     preAllocatedVUs: PreAllocatedVUs,
        //     maxVUs: MaxVUs,
        //     exec: 'searchAPI',
        // },
        toxicity: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'toxicity',
        },
        textEmbedding: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'textEmbedding',
        },
        spladeQuery: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'spladeQuery', // Function to be executed
        },
        spladeDoc: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'spladeDoc', // Function to be executed
        },
        

                // Add more scenarios as needed
    },
};

// Read the content of the file in the global scope
const contextTexts = open('./assets/llmlingua.txt').split('\n');

export function llmlingua() {
    try {
        let postUrl = 'http://search-llmlingua.dev.curieo.ai/compress';
        let postHeaders = {
            'Content-Type': 'application/json',
        };

        let postBody = JSON.stringify({
            "query": "CAR T-cell therapies",
            "context_texts_list": contextTexts, // using the pre-read content
            "target_token": 300
        });

        let postRes = http.post(postUrl, postBody, { headers: postHeaders });

        console.log('POST Response status:', postRes.status);
        console.log('POST Response body:', postRes.body);

        check(postRes, {
            'LLMLingua POST status was 200': (r) => r.status == 200,
        });
    } catch (error) {
        console.error('Error in llmlingua function:', error);
    } finally {
        sleep(1);
    }
}


// export function searchAPI() {
//     // GET request
//     const url = 'https://www.searchapi.io/api/v1/search?api_key=YYLBuaJ9p5s2FwkVD5LyKnFq&engine=bing&q=CAR%20T-cell%20therapies';
//     const requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };

//     let res = http.get(url, requestOptions);

//     console.log('GET Response status:', res.status);
//     console.log('GET Response body:', res.body);

//     check(res, {
//         'GET status was 200': (r) => r.status == 200,
//     });

//     sleep(1);
// }

export function toxicity() {
    try {
        let url = 'https://toxicity.dev.curieo.ai/predict';
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer d86c23e3-c2b4-4d2f-8854-e1ed29a5960d'
        };
        let body = JSON.stringify({
            "inputs": "What is pancreas?"
        });

        let res = http.post(url, body, { headers: headers });

        console.log('POST Response status:', res.status);
        console.log('POST Response body:', res.body);

        check(res, {
            'Toxicity POST status was 200': (r) => r.status == 200,
        });
    } catch (error) {
        console.error('Error in toxicity function:', error);
    } finally {
        sleep(1);
    }
}

// Read the content of the file in the global scope
const inputs = open('./assets/textembedding.txt').split('\n');

export function textEmbedding() {
    try {
        let url = 'http://text-embedding.dev.curieo.ai/embed';
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer e9260789-8d00-42b5-bf11-034e76eba43d'
        };
        let body = JSON.stringify({
            "inputs": inputs // using the pre-read content
        });

        let res = http.post(url, body, { headers: headers });

        console.log('POST Response status:', res.status);
        console.log('POST Response body:', res.body);

        check(res, {
            'TextEmbedding POST status was 200': (r) => r.status == 200,
        });
    } catch (error) {
        console.error('Error in textEmbedding function:', error);
    } finally {
        sleep(1);
    }
}

export function spladeQuery() {
    try {
        let url = 'https://text-splade-query.dev.curieo.ai/embed_sparse';
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 5f211870-365a-499a-9700-995fa4794970'
        };
        let body = JSON.stringify({
            "inputs": inputs // using the pre-read content
        });

        let res = http.post(url, body, { headers: headers });

        console.log('POST Response status:', res.status);
        console.log('POST Response body:', res.body);

        check(res, {
            'SpladeQuery POST status was 200': (r) => r.status == 200,
        });
    } catch (error) {
        console.error('Error in spladeQuery function:', error);
    } finally {
        sleep(1);
    }
}

// Read the content of the file in the global scope
const spladeDocInputs = open('./assets/spladedoc.txt').split('\n');

export function spladeDoc() {
    try {
        let url = 'http://text-splade-doc.dev.curieo.ai/embed_sparse';
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer b48d0253-a17e-4328-ba42-d54cd180c2a7',
            'Cookie': 'oidc_state_csrf=MTcxMjU5ODUzOXxOd3dBTkVoUlJEWTNVMDVZTkRSRE1qUXlRVWRWUVZjeVNEUXpVVVJGU1ZCTU1rSlJUalJLVFZZMFIwNUlUVFZIV2pReVFVUlhOMUU9fNpD7eZ1JEpZAc36FIuXyU3_JYEKHxC043pQEWlMeeTR'
        };
        let body = JSON.stringify({
            "inputs": spladeDocInputs // using the pre-read content
        });

        let res = http.post(url, body, { headers: headers });

        console.log('POST Response status:', res.status);
        console.log('POST Response body:', res.body);

        check(res, {
            'SpladeDoc status was 200': (r) => r.status == 200,
        });
    } catch (error) {
        console.error('Error in spladeDoc function:', error);
    } finally {
        sleep(1);
    }
}


// Add more functions as needed