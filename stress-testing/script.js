import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    scenarios: {
        scenario1: {
            executor: 'ramping-vus',
            stages: [
                { duration: '30s', target: 20 }, // ramp-up to 20 users over 30 seconds
                { duration: '1m', target: 20 },  // stay at 20 users for 1 minute
                { duration: '30s', target: 0 },  // ramp-down to 0 users
            ],
            exec: 'llmlingua', // Function to be executed
        },
        // scenario2: {
        //     executor: 'ramping-vus',
        //     stages: [
        //         { duration: '1m', target: 10 },  // ramp-up to 10 users over 1 minute
        //         { duration: '2m', target: 10 },  // stay at 10 users for 2 minutes
        //         { duration: '1m', target: 0 },   // ramp-down to 0 users
        //     ],
        //     exec: 'searchAPI', // Function to be executed
        // },
        // Add more scenarios as needed
    },
};

export function llmlingua() {
    // POST request
    let postUrl = 'http://search-llmlingua.dev.curieo.ai/compress';
    let postHeaders = {
        'Content-Type': 'application/json',
    };
    let postBody = JSON.stringify({
        "query": "CAR T-cell therapies",
        "context_texts_list": [
            "Chimeric Antigen Receptor (CAR) T cell therapies - adoptive T cell therapies that have been genetically engineered for a new antigen-specificity - have displayed significant success in treating patients with hematologic malignancies, leading to three recent US Food and Drug Administration approvals. Based on the promise generated from these successes, the field is rapidly evolving to include new disease indications and CAR designs, while simultaneously reviewing and optimizing toxicity and management protocols. As such, this review provides expert perspective on the significance and clinical considerations of CAR T cell therapies in order to provide timely information to clinicians about this revolutionary new therapeutic class.Chimeric antigen receptor (CAR) T-cells (CAR T-cells) are a promising therapeutic approach in treating hematological malignancies. CAR T-cells represent engineered autologous T-cells, expressing a synthetic CAR, targeting tumor-associated antigens (TAAs) independent of major histocompatibility complex (MHC) presentation.",
            "The most common target is CD19 on B-cells, predominantly used for the treatment of lymphoma and acute lymphocytic leukemia (ALL), leading to approval of five different CAR T-cell therapies for clinical application. Despite encouraging clinical results, treatment of other hematological malignancies such as acute myeloid leukemia (AML) remains difficult. In this review, we focus especially on CAR T-cell application in different hematological malignancies as well as strategies for overcoming CAR T-cell dysfunction and increasing their efficacy.Chimeric antigen receptor-engineered (CAR) T-cell therapy is a promising novel immunotherapy that has the potential to revolutionize cancer treatment. Four CAR T-cell therapies have received FDA approval within the last 5 years, and the role of CAR T cells is anticipated to continue to evolve and expand. However, various aspects of CAR T-cell therapies remain poorly understood, and the therapies are associated with severe side effects, including cytokine release syndrome and immune effector cell-associated neurotoxicity, which require prompt diagnosis and intervention. The purposes of this review are to describe the role of imaging in diagnosing and monitoring toxicities from CAR T-cell therapies and explore the use of various imaging techniques, including PET/CT with novel radiotracers, to predict and assess treatment response and adverse effects. ",
            "It is important for radiologists to recognize the imaging findings associated with each syndrome and to recognize the typical and atypical treatment response patterns associated with CAR T-cell therapy. Given the expected increase in use of CAR T cells in the near future, radiologists should familiarize themselves with the imaging findings encountered in these novel therapies so that they can provide comprehensive and up-to-date guidance for clinical management.Recent reports on the impressive efficacy of adoptively transferred T cells to challenge cancer in early phase clinical trials have significantly raised the profile of T cell therapy. Concomitantly, general expectations are also raised by these reports, with the natural aspiration to deliver this therapy over a wide range of tumor indications. Chimeric antigen receptors (CARs) endow T cell populations with defined antigen specificities that function independently of the natural T cell receptor and permit targeting of T cells towards virtually any tumor.",
            " Here, we review the current clinical application of CAR-T cells and relate clinical efficacy and safety of CAR-T cell trials to parameters considered critical for CAR engineering, classified as the three T's of CAR-T cell manipulation.Chimeric antigen receptor (CAR) T-cell therapy is one of the most innovative therapies for haematological malignancies to emerge in a generation. Clinical studies have shown that a single dose of CAR T-cells can deliver durable clinical remissions for some patients with B﻿-cell cancers where conventional therapies have failed.A significant complication of CAR therapy is the immune effector cell-associated neurotoxicity syndrome (ICANS). This syndrome presents a continuum from mild tremor to cerebral oedema and in a minority of cases, death. Management of ICANS is mainly supportive, with a focus on seizure prevention and attenuation of the immune system, often using corticosteroids. Parallel investigation to exclude other central nervous system pathologies (infection, disease progression) is critical. In this review, we discuss current paradigms around CAR T-cell therapy, with a focus on appropriate investigation and management of ICANS.Chimeric antigen receptors (CAR) T cells are T cells engineered to express membrane receptors with high specificity to recognize specific target antigens presented by cancer cells and are co-stimulated with intracellular signals to increase the T cell response.",
            "CAR-T cell therapy is emerging as a novel therapeutic approach to improve T cell specificity that will lead to advances in precision medicine. CAR-T cells have had impressive outcomes in hematological malignancies. However, there continue to be significant limitations of these therapeutic responses in targeting solid malignancies such as heterogeneous antigens in solid tumors, tumor immunosuppressive microenvironment, risk of on-target/off-tumor, infiltrating CAR-T cells, immunosuppressive checkpoint molecules, and cytokines. This review paper summarizes recent approaches and innovations through combination therapies of CAR-T cells and other immunotherapy or small molecule drugs to counter the above disadvantages to potentiate the activity of CAR-T cells."
        ],
        "target_token": 300
    });

    let postRes = http.post(postUrl, postBody, { headers: postHeaders });

    console.log('POST Response status:', postRes.status);
    console.log('POST Response body:', postRes.body);

    check(postRes, {
        'LLMLINGUA POST status was 200': (r) => r.status == 200,
    });

    sleep(1);
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

// Add more functions as needed
