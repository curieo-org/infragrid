# Perfomance test results for text-splade-doc

## Prerequisites

```bash
kubectl run alpine --image alpine --command sleep -- 1d
kubectl exec -it alpine -- sh

```

## Setup Vegeta

```bash

apk add --update ca-certificates
mkdir -p /vegeta & cd /vegeta
wget https://github.com/tsenart/vegeta/releases/download/v12.11.1/vegeta_12.11.1_linux_amd64.tar.gz
tar -zxvf vegeta_12.11.1_linux_amd64.tar.gz

chmod +x vegeta

ln -s ./vegeta /usr/local/bin/vegeta

```

## create config files

```bash
cat target_splade_doc.txt

POST http://text-splade-doc.dev.svc.cluster.local/embed
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

vegeta attack -targets=target_splade_doc.txt -rate=256 -duration=30s | vegeta report

```

## Results

### attempt 1

```bash

Requests      [total, rate, throughput]         7680, 256.03, 255.25
Duration      [total, attack, wait]             30.088s, 29.996s, 92.033ms
Latencies     [min, mean, 50, 90, 95, 99, max]  8.352ms, 152.131ms, 153.899ms, 193.133ms, 198.416ms, 204.433ms, 220.367ms
Bytes In      [total, mean]                     161554085, 21035.69
Bytes Out     [total, mean]                     14530560, 1892.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:7680
Error Set:

```

### attempt 2

```bash
Requests      [total, rate, throughput]         7680, 256.03, 255.13
Duration      [total, attack, wait]             30.102s, 29.997s, 105.154ms
Latencies     [min, mean, 50, 90, 95, 99, max]  6.225ms, 123.938ms, 124.617ms, 186.797ms, 194.62ms, 202.657ms, 209.598ms
Bytes In      [total, mean]                     161502956, 21029.03
Bytes Out     [total, mean]                     14530560, 1892.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:7680
Error Set:

```


### attempt 3

```bash
Requests      [total, rate, throughput]         7680, 256.03, 255.10
Duration      [total, attack, wait]             30.105s, 29.996s, 109.187ms
Latencies     [min, mean, 50, 90, 95, 99, max]  5.214ms, 141.882ms, 146.52ms, 191.564ms, 197.554ms, 203.525ms, 210.797ms
Bytes In      [total, mean]                     161535516, 21033.27
Bytes Out     [total, mean]                     14530560, 1892.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:7680
Error Set:

```
