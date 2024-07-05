import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

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
            exec: 'spladeQuery',
        },
        spladeDoc: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'spladeDoc',
        },
    },
};

const llmlinguaLatency = new Trend('llmlingua_latency');
const toxicityLatency = new Trend('toxicity_latency');
const textEmbeddingLatency = new Trend('textEmbedding_latency');
const spladeQueryLatency = new Trend('spladeQuery_latency');
const spladeDocLatency = new Trend('spladeDoc_latency');

const contextTexts = open('./assets/llmlingua.txt').split('\n');

export function llmlingua() {
    let postUrl = 'http://search-llmlingua.dev.curieo.ai/compress';
    let postHeaders = { 'Content-Type': 'application/json' };
    let postBody = JSON.stringify({
        "query": "CAR T-cell therapies",
        "context_texts_list": contextTexts,
        "target_token": 300
    });

    let res = http.post(postUrl, postBody, { headers: postHeaders });
    llmlinguaLatency.add(res.timings.duration);

    check(res, {
        'LLMLingua POST status was 200': (r) => r.status == 200,
    });

    if (res.status >= 300) {
        console.error(`Error in LLMLingua POST request: ${res.body}`);
    }
}

export function toxicity() {
    let url = 'https://toxicity.dev.curieo.ai/predict';
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${__ENV.AUTH_TOKEN_TOXICITY}`
    };
    let body = JSON.stringify({ "inputs": "What is pancreas?" });

    let res = http.post(url, body, { headers: headers });
    toxicityLatency.add(res.timings.duration);

    check(res, {
        'Toxicity POST status was 200': (r) => r.status == 200,
    });

    if (res.status >= 300) {
        console.error(`Error in Toxicity POST request: ${res.body}`);
    }
}

const inputs = open('./assets/textembedding.txt').split('\n');

export function textEmbedding() {
    let url = 'http://text-embedding.dev.curieo.ai/embed';
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${__ENV.AUTH_TOKEN_EMBEDDING_QUERY}`
    };
    let body = JSON.stringify({ "inputs": inputs });

    let res = http.post(url, body, { headers: headers });
    textEmbeddingLatency.add(res.timings.duration);

    check(res, {
        'TextEmbedding POST status was 200': (r) => r.status == 200,
    });

    if (res.status >= 300) {
        console.error(`Error in TextEmbedding POST request: ${res.body}`);
    }
}

export function spladeQuery() {
    let url = 'https://text-splade-query.dev.curieo.ai/embed_sparse';
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${__ENV.AUTH_TOKEN_EMBEDDING_QUERY}`
    };
    let body = JSON.stringify({ "inputs": inputs });

    let res = http.post(url, body, { headers: headers });
    spladeQueryLatency.add(res.timings.duration);

    check(res, {
        'SpladeQuery POST status was 200': (r) => r.status == 200,
    });

    if (res.status >= 300) {
        console.error(`Error in SpladeQuery POST request: ${res.body}`);
    }
}

const spladeDocInputs = open('./assets/spladedoc.txt').split('\n');

export function spladeDoc() {
    let url = 'http://text-splade-doc.dev.curieo.ai/embed_sparse';
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${__ENV.AUTH_TOKEN_SPLADE_DOC}`,
        'Cookie': `oidc_state_csrf=${__ENV.SPLADE_COOKIE}`
    };
    let body = JSON.stringify({ "inputs": spladeDocInputs });

    let res = http.post(url, body, { headers: headers });
    spladeDocLatency.add(res.timings.duration);

    check(res, {
        'SpladeDoc status was 200': (r) => r.status == 200,
    });

    if (res.status >= 300) {
        console.error(`Error in SpladeDoc POST request: ${res.body}`);
    }
}
