## Setup Vegeta

```bash

kubectl exec -it alpine -- sh

apk add --update ca-certificates
mkdir -p /vegeta & cd /vegeta
wget https://github.com/tsenart/vegeta/releases/download/v12.11.1/vegeta_12.11.1_linux_amd64.tar.gz
tar -zxvf vegeta_12.11.1_linux_amd64.tar.gz

chmod +x vegeta

ln -s ./vegeta /usr/local/bin/vegeta

```

## create config files

```bash
cat target_embedding.txt

POST http://text-embedding.dev.svc.cluster.local/embed
Content-Type: application/json
Authorization: Bearer <bearer token>
@test_batch_2.json
```


```bash
cat test_batch_2.json

{
    "inputs": [
        "Despite dramatic advances in cancer research setting, breast cancer remains a major health problem and represents currently a top biomedical research priority. Worldwide, breast cancer is the most common cancer affecting women, and its incidence and mortality rates are expected to increase significantly the next years. Recently the researchers' interest has been attracted by breast cancer arising in young women. Current evidence suggests that in women aged <45 years, breast cancer is unquestionably the leading cause of cancer-related deaths. This type of cancer seems to be highly heterogeneous and has potentially aggressive and complex biological features. However, management strategies, recommendations and options are not age based and the 'complex' biology of this type of cancer remains uncertain and unexplored. In this review, we summarize the latest scientific information on breast cancer arising in young women highlighting the heterogeneity and the complex nature of this type of cancer.",
        "Lung cancer is a leading cause of cancer death in the United States and globally with the majority of lung cancer cases attributable to cigarette smoking. Given the high societal and personal cost of a diagnosis of lung cancer including that most cases of lung cancer when diagnosed are found at a late stage, work over the past 40 years has aimed to detect lung cancer earlier when curative treatment is possible. Screening trials using chest radiography and sputum failed to show a reduction in lung cancer mortality however multiple studies using low dose CT have shown the ability to detect lung cancer early and a survival benefit to those screened. This review will discuss the history of lung cancer screening, current recommendations and screening guidelines, and implementation and components of a lung cancer screening program."
    ]
}

```

## run vegeta script  

```bash

vegeta attack -targets=target_embedding.txt -rate=256 -duration=30s | vegeta report

```

## Results

### attempt 1

```bash

Requests      [total, rate, throughput]         7680, 256.04, 236.83
Duration      [total, attack, wait]             32.429s, 29.996s, 2.433s
Latencies     [min, mean, 50, 90, 95, 99, max]  18.994ms, 1.312s, 1.255s, 2.408s, 2.505s, 2.618s, 2.737s
Bytes In      [total, mean]                     195961189, 25515.78
Bytes Out     [total, mean]                     14530560, 1892.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:7680
Error Set:

```

### attempt 2

```bash
Requests      [total, rate, throughput]         7680, 256.04, 232.76
Duration      [total, attack, wait]             32.995s, 29.996s, 2.999s
Latencies     [min, mean, 50, 90, 95, 99, max]  29.844ms, 2.139s, 2.242s, 3.156s, 3.244s, 3.635s, 3.922s
Bytes In      [total, mean]                     195851602, 25501.51
Bytes Out     [total, mean]                     14530560, 1892.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:7680
Error Set:

```


### attempt 3

```bash
Requests      [total, rate, throughput]         7680, 256.03, 236.61
Duration      [total, attack, wait]             32.458s, 29.996s, 2.462s
Latencies     [min, mean, 50, 90, 95, 99, max]  23.261ms, 1.393s, 1.201s, 2.266s, 3.071s, 4.22s, 4.417s
Bytes In      [total, mean]                     195956225, 25515.13
Bytes Out     [total, mean]                     14530560, 1892.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:7680
Error Set:

```

