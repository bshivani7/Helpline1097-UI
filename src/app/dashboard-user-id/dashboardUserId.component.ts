import { Component, OnInit } from '@angular/core';
import { dataService } from '../services/dataService/data.service';
import { CzentrixServices } from './../services/czentrix/czentrix.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dashboard-user-id',
    templateUrl: './dashboardUserId.html',
})
export class DashboardUserIdComponent implements OnInit {
    current_service: any;
    current_role: any;
    status: any;
    constructor(
        public dataSettingService: dataService,
        public router: Router,
        private Czentrix: CzentrixServices
    ) {
        this.current_service = this.dataSettingService.current_service.serviceName;
        this.current_role = this.dataSettingService.current_role.RoleName;

    };
    ngOnInit() {
        this.getAgentStatus()
    }
    getAgentStatus() {
        this.Czentrix.getAgentStatus().subscribe((res) => {
            this.status = res.data.stateObj.stateName;
            if (this.status.toUpperCase() === "INCALL") {
                let CLI = res.data.CLI;
                let session_id = res.data.session_id;
                sessionStorage.setItem("isOnCall", "yes");
                this.router.navigate(['/InnerpageComponent', CLI, session_id, "INBOUND"]);
            } else {
                if (res.data.stateObj.stateType) {
                    this.status += ' (' + res.data.stateObj.stateType + ')';
                }
            }
        }, (err) => {

        })
    }
}