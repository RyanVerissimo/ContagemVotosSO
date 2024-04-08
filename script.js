let votes = [0, 0, 0, 0, 0, 0];
let totalVotes = 0;
let votingInProgress = true;

function vote(option) {
    playSound();
    votes[option - 1]++;
    totalVotes++;
}

function playSound() {
    let sound = document.getElementById('button-sound');
    sound.play();
}

function toggleVoting() {
    if (votingInProgress) {
        endVoting();
    } else {
        startVoting();
    }
}

function startVoting() {
    document.getElementById('toggle-btn').textContent = 'Encerrar Votação';
    votes = [0, 0, 0, 0, 0, 0];
    totalVotes = 0;
    document.getElementById('result').style.display = 'none';
    votingInProgress = true;
}

function endVoting() {
    document.getElementById('toggle-btn').textContent = 'Começar Votação';
    document.getElementById('result').style.display = 'block';
    let resultTable = document.getElementById('result-table');
    resultTable.innerHTML = '';
    let options = ["Windows Server", "Unix", "Linux", "Netware", "Mac OS", "Outro"];
    let maxVotes = Math.max(...votes);
    let winners = [];

    for (let i = 0; i < votes.length; i++) {
        let percent = ((votes[i] / totalVotes) * 100).toFixed(2);
        let row = `<tr>
                            <td>${options[i]}</td>
                            <td>${votes[i]}</td>
                            <td>${percent}%</td>
                        </tr>`;
        resultTable.innerHTML += row;

        if (votes[i] === maxVotes) {
            winners.push(options[i]);
        }
    }

    document.getElementById('total-votes').textContent = totalVotes;

    if (winners.length === 1) {
        document.getElementById('winner').innerHTML = `O Sistema Operacional mais votado foi o ${winners[0]}, com ${maxVotes} votos, correspondendo a ${(maxVotes / totalVotes * 100).toFixed(2)}% dos votos.`;
    } else {
        let winnerString = winners.join(' e ');
        document.getElementById('winner').innerHTML = `Houve um empate entre ${winnerString}, com ${maxVotes} votos, correspondendo a ${(maxVotes / totalVotes * 100).toFixed(2)}% dos votos.`;
    }

    votingInProgress = false;
}