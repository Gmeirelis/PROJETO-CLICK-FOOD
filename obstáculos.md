
# 1. Problemas com arquivo JSON (Case Sensitivity)

Durante o desenvolvimento do projeto, o arquivo restaurante.json tinha como objetivo armazenar as informações dos restaurantes, permitindo a renderização e a busca dos restaurantes no campo de pesquisa.
No ambiente de desenvolvimento, utilizando o VS Code com Live Server, a aplicação funcionava normalmente. No entanto, após realizar o git push e acessar o projeto pelo GitHub Pages, a funcionalidade de busca deixava de funcionar e a tela ficava em branco ao pesquisar um restaurante.

 # Causa do problema

- O problema estava relacionado à diferença de comportamento entre sistemas de arquivos:
- O Live Server (Windows) não é sensível a letras maiúsculas e minúsculas (não é case sensitive).
- O navegador ao acessar via GitHub Pages (Linux) é case sensitive.
- Havia inconsistência entre o nome do arquivo e o caminho utilizado no código, por exemplo:

  -fetch("Restaurante.json")
  -restaurante.json
  
# Solução

Foi necessário padronizar os nomes dos arquivos e referências, garantindo que o nome utilizado no código correspondesse exatamente ao nome real do arquivo, respeitando letras maiúsculas e minúsculas.
Após essa correção, a aplicação passou a funcionar corretamente também no GitHub Pages.

# Aprendizado

Esse problema evidenciou a importância de:

- Padronizar nomes de arquivos (preferencialmente em minúsculo)
- Testar a aplicação em ambiente de produção
- Entender diferenças entre sistemas de arquivos e ambientes de execução







