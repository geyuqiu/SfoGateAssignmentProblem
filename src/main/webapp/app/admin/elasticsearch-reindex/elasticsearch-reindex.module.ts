import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElasticsearchReindexComponent, ElasticsearchReindexModalComponent, elasticsearchReindexRoute } from './';
import { SfoGateAssignmentProblemSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SfoGateAssignmentProblemSharedModule, RouterModule.forChild([elasticsearchReindexRoute])],
  declarations: [ElasticsearchReindexComponent, ElasticsearchReindexModalComponent],
  entryComponents: [ElasticsearchReindexModalComponent],
})
export class SfoGateAssignmentProblemElasticsearchReindexModule {}
