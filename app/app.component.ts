import {Component, OnInit, Inject} from '@angular/core';
import {provide} from '@angular/core';

import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, RouteSegment} from '@angular/router';

import {PlatformLocation,Location,LocationStrategy,HashLocationStrategy,PathLocationStrategy,APP_BASE_HREF} from '@angular/common';
import {BrowserPlatformLocation} from '@angular/platform-browser';

import {AuthService} from './services/auth.service';
import {TokenService} from './services/token.service';
import {AddNoteComponent} from './notes/add-note.component';
import {TimeLineComponent} from './timeline/timeline.component';
import {LoginComponent} from './authentication/login.component';
import {NgIf} from '@angular/common';
import {Configuration} from './app.constants';
import {TagsComponent} from './tags/tags.component';
import {TagIdentityComponent} from './tags/add-tag.component';
import {UserProfileComponent} from './userprofile/userprofile.component';
import {RecentTimeLineComponent} from './recenttimeline/recenttimeline.component';
import {Dashboard} from './dashboard/dashboard.component';
import {NotificaitonComponent} from './notifications/notifications.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {FeedbackService} from './services/feedback.service';
import {TagDetailComponent} from './tags/tag-detail.component';
import {LoadingComponent} from './loader/loading.component';


@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, UserProfileComponent, NotificaitonComponent, FeedbackComponent, AddNoteComponent, LoadingComponent],
    providers: [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy }),
        AuthService,
        TokenService,
        LoginComponent,
        AddNoteComponent,
        Configuration,
        FeedbackService
    ]
})

@Routes(
    [
        {
            path: '/login',
            component: LoginComponent,
        },
       
        {
            path: '/addnote',
            component: AddNoteComponent
        },
        {
            path: '/timeline',
            component: TimeLineComponent
        },
        {
            path: '/tags',
            component: TagsComponent
        },
        {
             path: '/tag/:id',
             component: TagDetailComponent
        },
		{
             path: '/newtag/:id',
             component: TagIdentityComponent
        },
        {
            path: '/recenttimeline',
            component: RecentTimeLineComponent
        },
        {
            path: '/dashboard',
            component: Dashboard
        }

    ]
)

export class AppComponent implements OnInit {

    isAuthorized: boolean = this._tokenService.getTokenFromCookie() != "";
    ngOnInit() {
        if (this.isAuthorized) {
            this._tokenService.setToken(this._tokenService.getTokenFromCookie());
            this._router.navigate(['/dashboard']);
        }
        else {
            this._router.navigate(['/login']);
        }
    }

    constructor(private _router: Router, private _location: Location, private _tokenService: TokenService) {
    }

    isActiveRoute(route: string) {
        return this._location.path().indexOf(route) > -1;
        //return this._router.serializeUrl(this._router.urlTree) == this._router.serializeUrl((this._router.createUrlTree([route])));
    } 
}
