import {Component, OnInit} from '@angular/core';
import { RecentTimeLineComponent } from '../recenttimeline/recenttimeline.component';
import { ThinkHelpful } from '../thinkhelpful/thinkhelpful.component';
import { WhatIsGoingOnComponent } from '../whatisgoingon/whatisgoingon.component';
import {TokenService} from '../services/token.service';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    providers: [],
    directives: [RecentTimeLineComponent, ThinkHelpful, WhatIsGoingOnComponent]
})

export class Dashboard implements OnInit{

    isAuthorized: boolean = this._tokenService.getTokenFromCookie() != "";
    ngOnInit() {
        if (!this.isAuthorized) {
            this._router.navigate(['/login']);
        }
    }
    constructor(private _router: Router, private _tokenService: TokenService) { }
}

