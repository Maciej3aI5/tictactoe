let licznik = 0;
let tura = 1;
let tab = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let czy_wynik = false;
let pola=[];
document.addEventListener("keydown", (event) => {
    const kwadratElement = document.getElementById('kwadrat');
    if (event.key == 'A' || event.key == 'a' && licznik == 0) {
        for (let i = 1; i <= 9; i++) {
            const pole = new Pole(i, kwadratElement);
            pole.click();
            document.querySelector('h1').innerText = "BLUE TURN!!";
            pola.push(pole);
        }
        licznik = 1;
    }
    if (event.key == 'A' || event.key == 'a' && czy_wynik == true) {
        resetujGra();
    }
});

class Pole {
    constructor(id, parentElement) {
        this.id = id;
        this.gracz = "nikt";
        this.element = document.createElement('button');
        this.element.classList.add("pola");
        parentElement.appendChild(this.element);
    }
    click() {
        this.element.onclick = () => {
            if (tura % 2 == 0 && this.gracz == "nikt") {
                this.element.style.backgroundColor = "red";
                this.gracz = "kolko";
                document.querySelector('h1').innerText = "BLUE TURN!!";
                tura++;
                tab[this.id - 1] = 1;
            } else if (tura % 2 != 0 && this.gracz == "nikt") {
                this.element.style.backgroundColor = "blue";
                this.gracz = "krzyzyk";
                document.querySelector('h1').innerText = "RED TURN!!";
                tura++;
                tab[this.id - 1] = 2;
            }
            this.sprawdz();
        }
    }
    sprawdz() {
        let czy_puste = false;
        const rows = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];
        for (let j = 0; j < 8; j++) {
            if (tab[rows[j][0] - 1] > 0 && tab[rows[j][0] - 1] == tab[rows[j][1] - 1] && tab[rows[j][0] - 1] == tab[rows[j][2] - 1] && czy_wynik == false) {
                czy_wynik = true;
                document.getElementById('overlay').style.pointerEvents="auto";
                if (tab[rows[j][0] - 1] == 1)
                    document.querySelector('h1').innerText = "RED WINS!!!!__PRESS A TO RESTART";
                else
                    document.querySelector('h1').innerText = "BLUE WINS!!__PRESS A TO RESTART";
            }
        }
        for (let j = 0; j < 9; j++) {
            if (tab[j] == 0) {
                czy_puste = true;
            }
        }
        if (czy_puste == false && czy_wynik == false) {
            document.querySelector('h1').innerText = "DRAW!!__PRESS A TO RESTART";
            czy_wynik=true;
        }
    }
}

function resetujGra() {
    console.log(pola.length);
    const kwadratElement = document.getElementById('kwadrat');
    for (let i = 0; i < pola.length; i++) {
        pola[i].element.remove();
    }
    pola = [];
    document.getElementById('overlay').style.pointerEvents="none";
    tura = 1;
    tab = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    czy_wynik = false;
    document.querySelector('h1').innerText = "BLUE TURN!!";
    for (let i = 1; i <= 9; i++) {
        const pole = new Pole(i, kwadratElement);
        pole.click();
        pola.push(pole);
    }
}

