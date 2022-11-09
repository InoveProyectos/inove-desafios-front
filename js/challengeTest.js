
function TestTrialCard(description, result, actual=0, expected=0) {
    this.description = description[0].toUpperCase() + description.substring(1);
    this.result = result;
    this.actual = actual;
    this.expected = expected;
    
    if(result == "success") {
        this.status = "pass";
    }
    else {
        this.status = "error";
    }

    this.render = () => {
        let values = "";
        if(result != "error") {
            values = `
                <div>Valor obtenido/resultado:</div>
                <div>${this.actual}</div>
                <div>Valor esperado</div>
                <div>${this.expected}</div>
                `;
        }
        return `
        <div class="tcard-trial-container">
            <div class="ribbon ribbon-top-right ${this.status}">
                <span class="ribbon-span ${this.status}">${this.status}</span>
            </div>
            <div class="tcard-trial-text">
                <div class="tcard-test-name">
                    ${this.description}</div>
                ${values}
            </div>
        </div>
        `
    };
}

function TestCard(id, totalSuccess, totalTrials, name, inputs, trials) {
    this.id = id;
    this.totalSuccess = totalSuccess;
    this.totalTrials = totalTrials;
    this.name = name[0].toUpperCase() + name.substring(1);;
    this.inputs = inputs;
    this.trials = trials;

    this.render = () => {
        let trials = "";
        this.trials.forEach(trial => { 
            trials += trial.render();
        });
        const status = totalSuccess == totalTrials? "pass":"fail";
        return `
        <div class="tcard ${status}">
            <h3 class="tcard-title">
                <i class="fas fa-bullseye"></i>  Test ${this.id} (${this.totalSuccess}/${this.totalTrials})
            </h3>
            <div class="tcard-text">
                <div class="tcard-test-container">
                    <div class="tcard-test-name">
                    ${this.name}</div>
                    <div>Entradas:</div>
                    <div>${this.inputs}</div>
                </div>
                ${trials}
            </div>
            <button class="tcard-toggle">
            <i class="fas fa-chevron-down"></i>
            <i class="fas fa-times"></i>
            </button>
        </div>
        `
    };
}

function challengeTestShow() {
    document.querySelector('#scoreSection').style.display = "block";
    document.querySelector('#testSection').style.display = "block";
}
function challengeTestHide() {
    document.querySelector('#scoreSection').style.display = "none";
    document.querySelector('#testSection').style.display = "none";
}

function challengeTest(data) {

    const all_passed = data["data"];
    const score = data["score"];
    const coderun = data["coderun"];

    document.querySelector('#score').innerHTML = `Puntaje: ${score}`;
    document.querySelector('#errorMessage').innerHTML = "";
    document.querySelector('#testSection').innerHTML = "";

    if(coderun == true) {
        const tests = data["tests"];
        let accumulator = "";
        let i = 1;
        
        tests.forEach(test => {            
            const name = test["test_name"];
            const result = test["test_description"]["result"];
            const inputs = String(test["input"]);
            let componentsTrial = [];
            let totalSuccess = 0;
            let totalTrials = 0;

            if(result != "error") {
                const trials = test["test_description"]["tests"];
                 componentsTrial = trials.map(trial => {
                    const message = trial["description"];
                    const expected = trial["expected"];
                    const actual = trial["actual"];
                    if(result == "success") {
                        totalSuccess++;
                    }
                    totalTrials++;
                    return new TestTrialCard(message, result, actual, expected);
                })
            }
            else {
                const message = test["Error"];
                totalSuccess = "-";
                totalTrials = "-";
                componentsTrial.push(new TestTrialCard(message, result));
            }
            const componentTest = new TestCard(i, totalSuccess, totalTrials, name, inputs, componentsTrial)
            accumulator +=  componentTest.render();
            i++;
        })
        
        document.querySelector('#testSection').innerHTML = accumulator;
        tcardToogle();
    }
    else{
        document.querySelector('#errorMessage').innerHTML = data["message"];
    }
}