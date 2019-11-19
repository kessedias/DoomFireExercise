//Array linear
const firePixelsArray   = [];
const fireWidth         = 40;
const fireWeight        = 40;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

//Função de inicialização
function start() {
    //chamando a estrutura
    createFireDataStructure();
    createFireSource();
    renderFire();

    setInterval(calculateFirePropagation, 50);
}

//Estruturação dos dados
function createFireDataStructure() {
    //multipla a largura pela altura para ter o resultado em pixels
    const numberOfPixels = fireWidth * fireWeight;
    //pega o resultado e incrementa 0 número 0 nos índices do array(0¹, 0², 0³) = intensidade zero de fogo
    for (let i = 0; i < numberOfPixels; i++) {
         firePixelsArray[i] = 0;
    }
};

//Programação dos dados
function calculateFirePropagation() {
    //passar de coluna em coluna
    for (let column = 0; column < fireWidth; column++) {
        //passando nas linhas
        for (let row = 0; row <fireWeight; row++) {
            const pixelIndex = column + ( fireWidth * row);

            updateFireIntensityPerPixel(pixelIndex);
        }
    }

    //depois que todos os pixels forem calculados, chama a renderização
    renderFire();
};

//função que pergunta para o pixel de baixo o valor da intensidade
function updateFireIntensityPerPixel(currentPixelIndex) {
    //recebe por parâmetro o pixel atual que está sendo iterado nos loops acima,
    //depois é pego este valor de referência e somado uma largura
    const belowPixelIndex = currentPixelIndex + fireWidth;

    //se o píxel for maior que o próprio canvas, não faça nada
    if (belowPixelIndex >= fireWidth * fireWeight) {
        return;
    }
    //valor do declínio, do desconto de intensidade
    //inserindo um valor randômico no decay
    const decay = Math.floor(Math.random() * 3);
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
    //se a subtração por menor ou igual a zero, atribui o valor da varíavel, se não coloca como 0
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

    //a captura do novo valor de intensidade com o desconto e vai jogá-lo dentro do pixel que estiver sendo iterado
    //invés de atualizar só o fogo do pixel de baixo ele também atualizará o pixel do lado para dar a sensaçaõ de movimento
    firePixelsArray[currentPixelIndex - decay] = newFireIntensity;
}

//Renderização - Parte visual(Prática)
function renderFire() {
    //inicializando a varíavel debug
    const debug = false;
    let html = '<table cellpadding=0>';

    //Interação nas linhas
    for(let row = 0; row < fireWeight; row++){
        html += '<tr>';

        //criando as células
        for (let column = 0; column < fireWidth; column++) {
            //Ver em qual coloca está e depois somar com o resultado do produto entre largura e linhas
            const pixelIndex = column + ( fireWidth * row);
            //Intensidade do fogo
            const fireIntensity = firePixelsArray[pixelIndex];

            //pegar os valor de RGB que estão na plaeta de cores e injetar no fundo da célula correspondente
            if (debug === true) {
                html += '<td>';
                //chamar varíavel dentro das aspas, usando crase
                html += `<div class="pixel-index">${pixelIndex}</div>`;
                html += fireIntensity
                html += '</td>';
            }else{
                const color = fireColorsPalette[fireIntensity];
                const colorString = `${color.r}, ${color.g}, ${color.b}`;
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
                html += '</td>'
            }


        }

        html += '</td>';
    }

    html += '</table>';

    //pegar o elemento pelo id e substitutir pelo conteúdo na função
    document.querySelector('#fireCanvas').innerHTML = html;
};

//função para criar a fonte do fogo
function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        //largura multiplicada pela altura, substraída de uma largura para cair em uma linha anterior,
        //por final, somando o índice da coluna, que no caso é 0(primeira coluna)
        const overFlowPixelIndex = fireWidth * fireWeight;
        const pixelIndex = (overFlowPixelIndex - fireWidth) + column;

        firePixelsArray[pixelIndex] = 36;

    }
}

start();
