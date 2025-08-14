# Multithread com Nodejs

 - Este projeto é um aplicativo Node.js desenvolvido para encontrar um hash SHA-256 que começa com um prefixo específico. Ele utiliza o multithreading para executar essa tarefa de forma eficiente, demonstrando o poder do processamento paralelo no Node.js. 

## Single-thread vs. Multithread

     * Single-thread: Em um ambiente de thread única, um programa executa uma tarefa por vez, sequencialmente. O Node.js é naturalmente de thread única, lidando com todas as operações em um único loop de eventos. Isso é ótimo para tarefas intensivas de I/O, mas pode ser um gargalo para tarefas intensivas de CPU, pois um cálculo demorado irá bloquear a aplicação inteira.

     * Multithread: O multithreading permite que um programa execute várias threads (ou sequências de instruções) em paralelo. Isso é ideal para trabalhos intensivos de CPU, como nossa tarefa de encontrar o hash. Ao dividir o trabalho entre várias threads, podemos utilizar mais núcleos da CPU, reduzindo significativamente o tempo necessário para encontrar o hash desejado.

## Descrição do Projeto

 - Este aplicativo, desenvolvido como parte de um curso da Rocketseat, usa o módulo worker_threads do Node.js para criar uma solução multithread para um problema clássico de busca de hash.

 - O thread principal cria um número de threads de trabalho, igual ao número de núcleos de CPU disponíveis (ou um número especificado pelo usuário). Cada thread de trabalho, então, procura de forma independente por uma string aleatória (nonce) que, quando anexada a uma string de entrada fornecida e hashada com SHA-256, resulta em um hash que começa com um prefixo específico.

 - Assim que um worker encontra um hash correspondente, ele envia uma mensagem de volta para o thread principal. O thread principal, então, encerra todos os outros workers e imprime o resultado, mostrando a solução encontrada.

## Bibliotecas Usadas

 - A funcionalidade central deste projeto depende de alguns módulos embutidos do Node.js:

     - node:crypto: Este módulo fornece funcionalidades criptográficas, incluindo a função createHash usada para gerar hashes SHA-256.

     - node:os: A função cpus deste módulo é usada para determinar o número de núcleos de CPU disponíveis no sistema, o que ajuda a dimensionar automaticamente o número de threads de trabalho para um desempenho ideal.

     - node:worker_threads: Este é o módulo mais crucial para este projeto. Ele permite a criação de ambientes JavaScript isolados que rodam em threads separados, possibilitando a execução paralela de tarefas intensivas de CPU. Os componentes-chave usados são:

        * isMainThread: Uma flag booleana para determinar se o script atual está rodando no thread principal.

        * parentPort: Usado por um thread de trabalho para se comunicar de volta com seu thread principal.

        * Worker: A classe usada no thread principal para criar e gerenciar novos threads de trabalho.

        * workerData: Um objeto passado para um novo thread de trabalho, permitindo que ele receba dados iniciais do thread principal.