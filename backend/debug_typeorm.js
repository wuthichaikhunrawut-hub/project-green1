
const { DataSource } = require('typeorm');
const path = require('path');

// Try to load all entities
const entities = [
  require('./dist/users/entities/user.entity').User,
  require('./dist/users/entities/assessor-profile.entity').AssessorProfile,
  require('./dist/organizations/entities/organization.entity').Organization,
  require('./dist/carbon-logs/entities/carbon-log.entity').CarbonLog,
  require('./dist/carbon-logs/entities/emission-factor.entity').EmissionFactor,
  require('./dist/audit-logs/entities/audit-log.entity').AuditLog,
  require('./dist/assessments/entities/assessment.entity').Assessment,
  require('./dist/assessments/entities/assessment-detail.entity').AssessmentDetail,
  require('./dist/assessments/entities/evidence-file.entity').EvidenceFile,
  require('./dist/assessments/entities/green-criteria-master.entity').GreenCriteriaMaster,
  require('./dist/subscriptions/entities/subscription-plan.entity').SubscriptionPlan,
  require('./dist/subscriptions/entities/invoice.entity').Invoice,
];

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'greensync.sqlite',
  entities: entities,
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });
