const { coreLogic } = require('./coreLogic');
const { app } = require('./init');
const {
  namespaceWrapper,
  taskNodeAdministered,
} = require('./namespaceWrapper');


if (app) {
  app.get('/taskState', async (req, res) => {
    const state = await namespaceWrapper.getTaskState();
    console.log('TASK STATE HERE', state);
    res.status(200).json({ taskState: state });
  });

  app.get('/value', async (req, res) => {
    const value = await namespaceWrapper.storeGet('value');
    console.log('value HERE', value);
    res.status(200).json({ value: value });
  });


  app.post('/task', async (req, res) => {
    const { round } = req.query;
    let result = await coreLogic.task(round);
    res.status(200).json({ result });
  });

}


/**
 * setup
 * @description sets up the task node, particularly the inter-process communication to start and stop the task
 * @returns {void}
 */
async function setup() {
  console.log('setup function called');
  // Run default setup
  await namespaceWrapper.defaultTaskSetup();
  process.on('message', m => {
    console.log('CHILD got message:', m);
    if (m.functionCall == 'submitPayload') {
      console.log('submitPayload called');
      coreLogic.submitTask(m.roundNumber);
    } else if (m.functionCall == 'auditPayload') {
      console.log('auditPayload called');
      coreLogic.auditTask(m.roundNumber);
    } else if (m.functionCall == 'executeTask') {
      console.log('executeTask called');
      coreLogic.task(m.roundNumber);
    } else if (m.functionCall == 'generateAndSubmitDistributionList') {
      console.log('generateAndSubmitDistributionList called');
      coreLogic.selectAndGenerateDistributionList(m.roundNumber, m.isPreviousRoundFailed);
    } else if (m.functionCall == 'distributionListAudit') {
      console.log('distributionListAudit called');
      coreLogic.auditDistribution(m.roundNumber, m.isPreviousRoundFailed);
    }
  });

}

if (taskNodeAdministered) {
  setup();
}

if (app) {
  //  Write your Express Endpoints here.
  //  For Example
  //  app.post('/accept-cid', async (req, res) => {})

  // Sample API that return your task state

  app.get('/taskState', async (req, res) => {
    const state = await namespaceWrapper.getTaskState();
    console.log('TASK STATE', state);

    res.status(200).json({ taskState: state });
  });
  app.use('/api/', require('./routes') );
}
