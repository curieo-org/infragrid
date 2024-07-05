### Supported Endpoints :

- LLMLingua
- ToxicityLLM
- TextEmbedding
- SpladeQuery
- SpladeDoc


## To start the k6 stress testing, Run the following command :

```
k6 run --out web-dashboard script.js
```
 - Replace web-dashboard with the available types if needed : cloud, csv, experimental-prometheus-rw, influxdb, json, statsd

Sample Successful Output :

```
     ✓ Toxicity POST status was 200
     ✓ LLMLingua POST status was 200
     ✓ SpladeQuery POST status was 200
     ✓ TextEmbedding POST status was 200
     ✓ SpladeDoc status was 200

     checks.........................: 100.00% ✓ 503       ✗ 0    
     data_received..................: 17 MB   453 kB/s
     data_sent......................: 2.7 MB  73 kB/s
     dropped_iterations.............: 1       0.027101/s
     http_req_blocked...............: avg=947.97ms min=0s       med=625.24ms max=5.9s    p(90)=1.89s    p(95)=1.9s    
     http_req_connecting............: avg=470.37ms min=0s       med=508.95ms max=1.63s   p(90)=633.04ms p(95)=641.28ms
     http_req_duration..............: avg=6.17s    min=194.36ms med=3.65s    max=25.39s  p(90)=16.29s   p(95)=20.7s   
       { expected_response:true }...: avg=6.17s    min=194.36ms med=3.65s    max=25.39s  p(90)=16.29s   p(95)=20.7s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 503  
     http_req_receiving.............: avg=991.63ms min=24µs     med=513.75ms max=8.41s   p(90)=3.12s    p(95)=4.63s   
     http_req_sending...............: avg=152.2µs  min=14µs     med=85µs     max=16.13ms p(90)=181.8µs  p(95)=236.79µs
     http_req_tls_handshaking.......: avg=476.81ms min=0s       med=0s       max=5.29s   p(90)=1.26s    p(95)=1.27s   
     http_req_waiting...............: avg=5.17s    min=194.06ms med=1.16s    max=25.39s  p(90)=16.29s   p(95)=20.7s   
     http_reqs......................: 503     13.631647/s
     iteration_duration.............: avg=8.12s    min=1.77s    med=5.72s    max=26.99s  p(90)=17.7s    p(95)=22.34s  
     iterations.....................: 503     13.631647/s
     vus............................: 3       min=3       max=329
     vus_max........................: 501     min=500     max=501


running (36.9s), 00000/00501 VUs, 503 complete and 0 interrupted iterations
llmlingua     ✓ [======================================] 0000/0100 VUs  10s  10.00 iters/s
spladeDoc     ✓ [======================================] 0000/0101 VUs  10s  10.00 iters/s
spladeQuery   ✓ [======================================] 0000/0100 VUs  10s  10.00 iters/s
textEmbedding ✓ [======================================] 0000/0100 VUs  10s  10.00 iters/s
toxicity      ✓ [======================================] 0000/0100 VUs  10s  10.00 iters/s

```

### Change the below parameters to adjust the stress on the server

```
const RPS = 10;
const Duration = '10s';
const PreAllocatedVUs = 100;
const MaxVUs = 2000;
```