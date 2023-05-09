import java.io.*;
import java.util.Scanner;
import java.util.NoSuchElementException;

class Jogador {

    private Integer id;

    private String nome;

    private Integer altura;

    private Integer peso;

    private String universidade;

    private Integer anoNascimento;

    private String cidadeNascimento;

    private String estadoNascimento;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getAltura() {
        return altura;
    }

    public void setAltura(Integer altura) {
        this.altura = altura;
    }

    public Integer getPeso() {
        return peso;
    }

    public void setPeso(Integer peso) {
        this.peso = peso;
    }

    public String getUniversidade() {
        return universidade;
    }

    public void setUniversidade(String universidade) {
        this.universidade = universidade;
    }

    public Integer getAnoNascimento() {
        return anoNascimento;
    }

    public void setAnoNascimento(Integer anoNascimento) {
        this.anoNascimento = anoNascimento;
    }

    public String getCidadeNascimento() {
        return cidadeNascimento;
    }

    public void setCidadeNascimento(String cidadeNascimento) {
        this.cidadeNascimento = cidadeNascimento;
    }

    public String getEstadoNascimento() {
        return estadoNascimento;
    }

    public void setEstadoNascimento(String estadoNascimento) {
        this.estadoNascimento = estadoNascimento;
    }

    public Jogador(int id, String nome, int altura, int peso, String universidade, int anoNascimento, String cidadeNascimento, String estadoNascimento) {
        this.id = id;
        this.nome = nome;
        this.altura = altura;
        this.peso = peso;
        this.universidade = universidade;
        this.anoNascimento = anoNascimento;
        this.cidadeNascimento = cidadeNascimento;
        this.estadoNascimento = estadoNascimento;

    }

    public Jogador(String input) {

        String[] substrings = input.split(",");

        this.id = Integer.parseInt(substrings.length > 0 ? substrings[0].trim() : "0");
        this.nome = substrings.length > 1 ? substrings[1].trim() : "nao informado";
        this.altura = Integer.parseInt(substrings.length > 2 ? substrings[2].trim() : "0");
        this.peso = Integer.parseInt(substrings.length > 3 ? substrings[3].trim() : "0");
        this.universidade = substrings.length > 4 && !substrings[4].isEmpty() ? substrings[4].trim() : "nao informado";
        this.anoNascimento = Integer.parseInt(substrings.length > 5 ? substrings[5].trim() : "0");
        this.cidadeNascimento = substrings.length > 6 ? substrings[6].trim() : "nao informado";
        this.estadoNascimento = substrings.length > 7 ? substrings[7].trim() : "nao informado";
    }

    public Jogador clone() {
        return new Jogador(id, nome, altura, peso, universidade, anoNascimento,
                cidadeNascimento, estadoNascimento);
    }

    public void ler() {

        Scanner sc = new Scanner(System.in);

        System.out.println("ID");
        this.id = sc.nextInt();
        System.out.println("Nome");
        this.nome = sc.next();
        System.out.println("Altura");
        this.altura = sc.nextInt();
        System.out.println("Peso");
        this.peso = sc.nextInt();
        System.out.println("Universidade");
        this.universidade = sc.next();
        System.out.println("Ano de Nascimento");
        this.anoNascimento = sc.nextInt();
        System.out.println("Cidade de Nascimento");
        this.cidadeNascimento = sc.next();
        System.out.println("Estado de Nascimento");
        this.estadoNascimento = sc.next();
    }

    public static int buscar(Jogador[] jogadores, int id) {
        int index = -1;
        for (int i = 0; i < jogadores.length; i++) {
            if (jogadores[i].getId() == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public void imprimir() {

        System.out.println("[" + this.id + " ## " + this.nome + " ## " + this.altura + " ## " + this.peso + " ## " +
                this.anoNascimento + " ## " + this.universidade + " ## " + this.cidadeNascimento + " ## " + this.estadoNascimento + "]");
    }
}

class ArquivoTextoLeitura {
    private BufferedReader entrada;

    ArquivoTextoLeitura(String nomeArquivo) {
        try {
            entrada = new BufferedReader(new InputStreamReader(new
                    FileInputStream(nomeArquivo), "UTF-8"));
        } catch (UnsupportedEncodingException excecao) {
            System.out.println(excecao.getMessage());
        } catch (FileNotFoundException excecao) {
            System.out.println("Arquivo nao encontrado");
        }
    }

    public void fecharArquivo() {
        try {
            entrada.close();
        } catch (IOException excecao) {
            System.out.println("Erro no fechamento do arquivo de leitura: " +
                    excecao);
        }
    }

    @SuppressWarnings("finally")
    public String ler() {
        String textoEntrada = null;
        try {
            textoEntrada = entrada.readLine();
        } catch (EOFException excecao) {
            textoEntrada = null;
        } catch (IOException excecao) {
            System.out.println("Erro de leitura: " + excecao);
            textoEntrada = null;
        } finally {
            return textoEntrada;
        }
    }
}

class FilaCircular {
    private int inicio;
    private int fim;
    private int tamanho;
    private Jogador[] elementos;

    public FilaCircular(int capacidade) {
        elementos = new Jogador[capacidade];
        inicio = 0;
        fim = 0;
        tamanho = 0;
    }

    public void enfileirar(Jogador elemento) {
        if (tamanho == elementos.length) {
            throw new IllegalStateException("Fila está cheia");
        }
        elementos[fim] = elemento;
        fim = (fim + 1) % elementos.length;
        tamanho++;
    }

    public Jogador desenfileirar() {
        if (tamanho == 0) {
            throw new IllegalStateException("Fila está vazia");
        }
        Jogador elemento = elementos[inicio];
        inicio = (inicio + 1) % elementos.length;
        tamanho--;
        return elemento;
    }

    public void imprimirTodos() {
        if (tamanho == 0) {
            System.out.println("Fila está vazia");
        } else {
            for (int i = 0; i < tamanho; i++) {
                int index = (inicio + i) % elementos.length;
                System.out.println(elementos[index]);
            }
        }
    }

    public static double mediaAlturas(FilaCircular filaJogadores) {
        if (filaJogadores.tamanho == 0) {
            throw new IllegalStateException("Fila de jogadores está vazia");
        } else {
            int somaAlturas = 0;
            int numJogadores = filaJogadores.tamanho;
            for (int i = 0; i < numJogadores; i++) {
                Jogador jogador = (Jogador) filaJogadores.elementos[(filaJogadores.inicio + i) % filaJogadores.elementos.length];
                somaAlturas += jogador.getAltura();
            }
            double mediaIdade = (double) somaAlturas / numJogadores;
            return mediaIdade;
        }
    }
}


class Aplicacao {

    public static void main(String[] args) {

        ArquivoTextoLeitura leituraArq = new ArquivoTextoLeitura("/tmp/jogadores.txt");
        Scanner scanner = new Scanner(System.in);

        Jogador[] jogadores = new Jogador[8000];
        int i = 0;

        String entrada = leituraArq.ler();
        if (entrada != null) {
            entrada = leituraArq.ler();
        }

        while (entrada != null) {
            jogadores[i] = new Jogador(entrada);
            i++;
            entrada = leituraArq.ler();
        }

        FilaCircular fila = new FilaCircular(5);
        fila.enfileirar(jogadores[0]);
        fila.enfileirar(jogadores[1]);
        fila.enfileirar(jogadores[2]);
        fila.enfileirar(jogadores[3]);
        fila.enfileirar(jogadores[4]);

        System.out.println("Média de altura: "+fila.mediaAlturas(fila));


        leituraArq.fecharArquivo();
        scanner.close();
    }

}




   
    

    
    



