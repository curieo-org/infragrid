import http from 'k6/http';
import { check, sleep } from 'k6';

const RPS = 10;
const Duration = '10s';
const PreAllocatedVUs = 100;
const MaxVUs = 2000;

export let options = {
    scenarios: {
        scenario1: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'llmlingua',
        },
        // scenario2: {
        //     executor: 'constant-arrival-rate',
        //     rate: RPS,
        //     timeUnit: '1s',
        //     duration: Duration,
        //     preAllocatedVUs: PreAllocatedVUs,
        //     maxVUs: MaxVUs,
        //     exec: 'searchAPI',
        // },
        scenario3: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'toxicity',
        },
        scenario4: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'textEmbedding',
        },

        scenario5: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: Duration,
            preAllocatedVUs: PreAllocatedVUs,
            maxVUs: MaxVUs,
            exec: 'sparseEmbedding', // Function to be executed
        },
        

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
        'LLMLingua POST status was 200': (r) => r.status == 200,
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

export function toxicity() {
    // POST request
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

    sleep(1);
}

export function textEmbedding() {
    // POST request
    let url = 'http://text-embedding.dev.curieo.ai/embed';
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer e9260789-8d00-42b5-bf11-034e76eba43d'
    };
    let body = JSON.stringify({
        "inputs": [
            "Despite dramatic advances in cancer research setting, breast cancer remains a major health problem and represents currently a top biomedical research priority. Worldwide, breast cancer is the most common cancer affecting women, and its incidence and mortality rates are expected to increase significantly the next years. Recently the researchers' interest has been attracted by breast cancer arising in young women. Current evidence suggests that in women aged <45 years, breast cancer is unquestionably the leading cause of cancer-related deaths. This type of cancer seems to be highly heterogeneous and has potentially aggressive and complex biological features. However, management strategies, recommendations and options are not age based and the 'complex' biology of this type of cancer remains uncertain and unexplored. In this review, we summarize the latest scientific information on breast cancer arising in young women highlighting the heterogeneity and the complex nature of this type of cancer.",
            "Lung cancer is a leading cause of cancer death in the United States and globally with the majority of lung cancer cases attributable to cigarette smoking. Given the high societal and personal cost of a diagnosis of lung cancer including that most cases of lung cancer when diagnosed are found at a late stage, work over the past 40 years has aimed to detect lung cancer earlier when curative treatment is possible. Screening trials using chest radiography and sputum failed to show a reduction in lung cancer mortality however multiple studies using low dose CT have shown the ability to detect lung cancer early and a survival benefit to those screened. This review will discuss the history of lung cancer screening, current recommendations and screening guidelines, and implementation and components of a lung cancer screening program.",
            "Several decades ago, colorectal cancer was infrequently diagnosed. Nowadays, it is the world's fourth most deadly cancer with almost 900 000 deaths annually. Besides an ageing population and dietary habits of high-income countries, unfavourable risk factors such as obesity, lack of physical exercise, and smoking increase the risk of colorectal cancer. Advancements in pathophysiological understanding have increased the array of treatment options for local and advanced disease leading to individual treatment plans. Treatments include endoscopic and surgical local excision, downstaging preoperative radiotherapy and systemic therapy, extensive surgery for locoregional and metastatic disease, local ablative therapies for metastases, and palliative chemotherapy, targeted therapy, and immunotherapy. Although these new treatment options have doubled overall survival for advanced disease to 3 years, survival is still best for those with non-metastasised disease. As the disease only becomes symptomatic at an advanced stage, worldwide organised screening programmes are being implemented, which aim to increase early detection and reduce morbidity and mortality from colorectal cancer.",
            "The preoperative assessment of patients with colorectal cancer (CRC) requires a multimodal approach, including endoscopic evaluation and clinical, radiographic, and biochemical assessment. In addition to providing a diagnosis, histologic review of biopsy specimens imparts valuable information about tumor grade and other important prognostic features that can help determine treatment. A thorough history and physical examination rounds out the initial evaluation and provides the surgeon and other treating physicians with vital additional information for detailed operative planning. Colon and rectal cancer, although closely related histologically, are considered, and often treated, very differently, depending on stage, based solely on location.",
            "Gastric cancer is a prevalent yet heterogeneous disease. From diet and lifestyle to genetics and ethnicity, our appreciation of the complexity of gastric cancer has evolved. This review will discuss the epidemiology of gastric cancer focusing on trends across various risk categories. We realize that gastric cancer is not merely a single disease, but rather individual diseases within a single organ-a distinction that will aid our understanding of disease heterogeneity and its significance.",
            "d_abstr_R Gastric cancer is a common malignancy with a poor prognosis, and surgical treatment remains the first-line approach to treatment to provide a cure. Despite advances in surgical techniques, radiotherapy, chemotherapy, and neoadjuvant therapy, gastric cancer remains the second leading cause of cancer death worldwide. Although the 5-year survival rate of early gastric cancer can reach >90%, due to the low early diagnosis rate, most patients present with advanced-stage gastric cancer. Therefore, there has been increasing interest in improving surgical treatment of advanced gastric cancer. Lymph node dissection is an important part of the surgical treatment of advanced gastric cancer due to the high incidence of lymph node metastasis. Although prospective studies have confirmed the safety and feasibility of laparoscopic surgery for early gastric cancer, the relevant treatment models of advanced gastric cancer still need to be further explored and validated. This review aims to provide an update on the recent advances in the surgical treatment of advanced gastric cancer.",
            "The past decade has seen many advances in knowledge about gastric cancer. Notably, tumour biology and lymphatic spread are now better understood, and treatment by surgical and medical oncologists has become more standardised. Since refrigerators have replaced other methods of food conservation, Helicobacter pylori has become a factor in the cause of gastric cancer. Cancers that arise at the oesophagogastric junction might be further examples of wealth-associated disease. To tailor treatment better, the western hemisphere needs to borrow from the East by establishing screening programmes for early diagnosis, through careful surgical resection, and through detailed analysis of tumour spread. In Europe and the USA, most patients reach treatment with cancers already at an advanced stage. For these patients, three important randomised trials are underway that evaluate combined therapy. Cytostatic drugs, especially angiogenesis inhibitors have proved disappointing; however, basic research efforts to detect familial gastric cancers and to assess minimally residual disease look more hopeful.",
            "Gastric cancer is the leading cause of cancer-related mortality across the world, with poor prognosis and a median overall survival of ≤12 months for advanced stage gastric cancer. Environmental, genetic and other predisposing factors contribute to the development of gastric cancer and a predominant factor was found to be infection of Helicobacter pylori Advances in understanding the deranged signalling pathways that are critical for normal cellular homeostasis helped in the development of novel drugs that target specific proteins and pathways to curtail the growth of gastric cancer. Genetic studies revealed several single nucleotide polymorphisms, chromosomal aberrations and epigenetic alterations that likely play a major role in elevating the susceptibility to develop gastric cancer. Methylation pattern of specific genes may likely prove to be a valid biomarker for early detection of gastric cancer, but much progress is needed to establish specific markers. Important developments have been made in targeting human epidermal growth factor receptor-2 and vascular endothelial growth factor receptor 2 for treating advanced gastro-oesophageal junction cancer, using specific monoclonal antibodies. Lack of efficacy with regard to targeting other signalling pathways including mesenchymal-epithelial transition/hepatocyte growth factor and mammalian target of rapamycin is probably due to suboptimal patient selection for these clinical trials, which is probably due to the lack of appropriate biomarkers, to decide on responsive patient population. Besides the development of antagonists for the cell growth-related signalling pathways, advances are also being made to tackle gastric cancer by immunotherapies, targeting immune check-points, which may hold promise for better treatment options in future."
        ]
    });

    let res = http.post(url, body, { headers: headers });

    console.log('POST Response status:', res.status);
    console.log('POST Response body:', res.body);

    check(res, {
        'textEmbedding POST status was 200': (r) => r.status == 200,
    });

    sleep(1);
}

export function sparseEmbedding() {
    // POST request
    let url = 'https://text-splade-query.dev.curieo.ai/embed_sparse';
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 5f211870-365a-499a-9700-995fa4794970'
    };
    let body = JSON.stringify({
        "inputs": [
            "Despite dramatic advances in cancer research setting, breast cancer remains a major health problem and represents currently a top biomedical research priority. Worldwide, breast cancer is the most common cancer affecting women, and its incidence and mortality rates are expected to increase significantly the next years. Recently the researchers' interest has been attracted by breast cancer arising in young women. Current evidence suggests that in women aged <45 years, breast cancer is unquestionably the leading cause of cancer-related deaths. This type of cancer seems to be highly heterogeneous and has potentially aggressive and complex biological features. However, management strategies, recommendations and options are not age based and the 'complex' biology of this type of cancer remains uncertain and unexplored. In this review, we summarize the latest scientific information on breast cancer arising in young women highlighting the heterogeneity and the complex nature of this type of cancer.",
            "Lung cancer is a leading cause of cancer death in the United States and globally with the majority of lung cancer cases attributable to cigarette smoking. Given the high societal and personal cost of a diagnosis of lung cancer including that most cases of lung cancer when diagnosed are found at a late stage, work over the past 40 years has aimed to detect lung cancer earlier when curative treatment is possible. Screening trials using chest radiography and sputum failed to show a reduction in lung cancer mortality however multiple studies using low dose CT have shown the ability to detect lung cancer early and a survival benefit to those screened. This review will discuss the history of lung cancer screening, current recommendations and screening guidelines, and implementation and components of a lung cancer screening program.",
            "Several decades ago, colorectal cancer was infrequently diagnosed. Nowadays, it is the world's fourth most deadly cancer with almost 900 000 deaths annually. Besides an ageing population and dietary habits of high-income countries, unfavourable risk factors such as obesity, lack of physical exercise, and smoking increase the risk of colorectal cancer. Advancements in pathophysiological understanding have increased the array of treatment options for local and advanced disease leading to individual treatment plans. Treatments include endoscopic and surgical local excision, downstaging preoperative radiotherapy and systemic therapy, extensive surgery for locoregional and metastatic disease, local ablative therapies for metastases, and palliative chemotherapy, targeted therapy, and immunotherapy. Although these new treatment options have doubled overall survival for advanced disease to 3 years, survival is still best for those with non-metastasised disease. As the disease only becomes symptomatic at an advanced stage, worldwide organised screening programmes are being implemented, which aim to increase early detection and reduce morbidity and mortality from colorectal cancer.",
            "The preoperative assessment of patients with colorectal cancer (CRC) requires a multimodal approach, including endoscopic evaluation and clinical, radiographic, and biochemical assessment. In addition to providing a diagnosis, histologic review of biopsy specimens imparts valuable information about tumor grade and other important prognostic features that can help determine treatment. A thorough history and physical examination rounds out the initial evaluation and provides the surgeon and other treating physicians with vital additional information for detailed operative planning. Colon and rectal cancer, although closely related histologically, are considered, and often treated, very differently, depending on stage, based solely on location.",
            "Gastric cancer is a prevalent yet heterogeneous disease. From diet and lifestyle to genetics and ethnicity, our appreciation of the complexity of gastric cancer has evolved. This review will discuss the epidemiology of gastric cancer focusing on trends across various risk categories. We realize that gastric cancer is not merely a single disease, but rather individual diseases within a single organ-a distinction that will aid our understanding of disease heterogeneity and its significance.",
            "d_abstr_R Gastric cancer is a common malignancy with a poor prognosis, and surgical treatment remains the first-line approach to treatment to provide a cure. Despite advances in surgical techniques, radiotherapy, chemotherapy, and neoadjuvant therapy, gastric cancer remains the second leading cause of cancer death worldwide. Although the 5-year survival rate of early gastric cancer can reach >90%, due to the low early diagnosis rate, most patients present with advanced-stage gastric cancer. Therefore, there has been increasing interest in improving surgical treatment of advanced gastric cancer. Lymph node dissection is an important part of the surgical treatment of advanced gastric cancer due to the high incidence of lymph node metastasis. Although prospective studies have confirmed the safety and feasibility of laparoscopic surgery for early gastric cancer, the relevant treatment models of advanced gastric cancer still need to be further explored and validated. This review aims to provide an update on the recent advances in the surgical treatment of advanced gastric cancer.",
            "The past decade has seen many advances in knowledge about gastric cancer. Notably, tumour biology and lymphatic spread are now better understood, and treatment by surgical and medical oncologists has become more standardised. Since refrigerators have replaced other methods of food conservation, Helicobacter pylori has become a factor in the cause of gastric cancer. Cancers that arise at the oesophagogastric junction might be further examples of wealth-associated disease. To tailor treatment better, the western hemisphere needs to borrow from the East by establishing screening programmes for early diagnosis, through careful surgical resection, and through detailed analysis of tumour spread. In Europe and the USA, most patients reach treatment with cancers already at an advanced stage. For these patients, three important randomised trials are underway that evaluate combined therapy. Cytostatic drugs, especially angiogenesis inhibitors have proved disappointing; however, basic research efforts to detect familial gastric cancers and to assess minimally residual disease look more hopeful.",
            "Gastric cancer is the leading cause of cancer-related mortality across the world, with poor prognosis and a median overall survival of ≤12 months for advanced stage gastric cancer. Environmental, genetic and other predisposing factors contribute to the development of gastric cancer and a predominant factor was found to be infection of Helicobacter pylori Advances in understanding the deranged signalling pathways that are critical for normal cellular homeostasis helped in the development of novel drugs that target specific proteins and pathways to curtail the growth of gastric cancer. Genetic studies revealed several single nucleotide polymorphisms, chromosomal aberrations and epigenetic alterations that likely play a major role in elevating the susceptibility to develop gastric cancer. Methylation pattern of specific genes may likely prove to be a valid biomarker for early detection of gastric cancer, but much progress is needed to establish specific markers. Important developments have been made in targeting human epidermal growth factor receptor-2 and vascular endothelial growth factor receptor 2 for treating advanced gastro-oesophageal junction cancer, using specific monoclonal antibodies. Lack of efficacy with regard to targeting other signalling pathways including mesenchymal-epithelial transition/hepatocyte growth factor and mammalian target of rapamycin is probably due to suboptimal patient selection for these clinical trials, which is probably due to the lack of appropriate biomarkers, to decide on responsive patient population. Besides the development of antagonists for the cell growth-related signalling pathways, advances are also being made to tackle gastric cancer by immunotherapies, targeting immune check-points, which may hold promise for better treatment options in future."
        ]
    });

    let res = http.post(url, body, { headers: headers });

    console.log('POST Response status:', res.status);
    console.log('POST Response body:', res.body);

    check(res, {
        'SpladeQuery POST status was 200': (r) => r.status == 200,
    });

    sleep(1);
}



// Add more functions as needed
