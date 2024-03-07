'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">CarCare documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutMePageModule.html" data-type="entity-link" >AboutMePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AboutMePageModule-9c18b7694e66d3046260d9fb08a5f4abe5f3de6208cee68f35fa9e4f5e2bc35df218bd413041bc2a869041fd13c3769eee99ecc191448a84d1421776b6354e6b"' : 'data-bs-target="#xs-components-links-module-AboutMePageModule-9c18b7694e66d3046260d9fb08a5f4abe5f3de6208cee68f35fa9e4f5e2bc35df218bd413041bc2a869041fd13c3769eee99ecc191448a84d1421776b6354e6b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutMePageModule-9c18b7694e66d3046260d9fb08a5f4abe5f3de6208cee68f35fa9e4f5e2bc35df218bd413041bc2a869041fd13c3769eee99ecc191448a84d1421776b6354e6b"' :
                                            'id="xs-components-links-module-AboutMePageModule-9c18b7694e66d3046260d9fb08a5f4abe5f3de6208cee68f35fa9e4f5e2bc35df218bd413041bc2a869041fd13c3769eee99ecc191448a84d1421776b6354e6b"' }>
                                            <li class="link">
                                                <a href="components/AboutMePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutMePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardAboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardAboutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutMePageRoutingModule.html" data-type="entity-link" >AboutMePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageModule.html" data-type="entity-link" >AdminPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminPageModule-ac5513ef5c9c2491ee7e6a854c0c7f94fcf7f9a6973af57b770dd04461ed660ce60af31df991aea75022e59c2b244f9cd0e02c38c6f55cc7f83b9ee7ba899107"' : 'data-bs-target="#xs-components-links-module-AdminPageModule-ac5513ef5c9c2491ee7e6a854c0c7f94fcf7f9a6973af57b770dd04461ed660ce60af31df991aea75022e59c2b244f9cd0e02c38c6f55cc7f83b9ee7ba899107"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPageModule-ac5513ef5c9c2491ee7e6a854c0c7f94fcf7f9a6973af57b770dd04461ed660ce60af31df991aea75022e59c2b244f9cd0e02c38c6f55cc7f83b9ee7ba899107"' :
                                            'id="xs-components-links-module-AdminPageModule-ac5513ef5c9c2491ee7e6a854c0c7f94fcf7f9a6973af57b770dd04461ed660ce60af31df991aea75022e59c2b244f9cd0e02c38c6f55cc7f83b9ee7ba899107"' }>
                                            <li class="link">
                                                <a href="components/AdminPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserListItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageRoutingModule.html" data-type="entity-link" >AdminPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-2ac9496f69b6943662d5740e221fe7642c7408f48b3a1069f49b0423ef8bd77f3568eb3bab0ff61d302d2797aae9963fe7dbae815a273b9cdf60f63631f32a9e"' : 'data-bs-target="#xs-components-links-module-AppModule-2ac9496f69b6943662d5740e221fe7642c7408f48b3a1069f49b0423ef8bd77f3568eb3bab0ff61d302d2797aae9963fe7dbae815a273b9cdf60f63631f32a9e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2ac9496f69b6943662d5740e221fe7642c7408f48b3a1069f49b0423ef8bd77f3568eb3bab0ff61d302d2797aae9963fe7dbae815a273b9cdf60f63631f32a9e"' :
                                            'id="xs-components-links-module-AppModule-2ac9496f69b6943662d5740e221fe7642c7408f48b3a1069f49b0423ef8bd77f3568eb3bab0ff61d302d2797aae9963fe7dbae815a273b9cdf60f63631f32a9e"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-914c38f0586896c2dbf9efef201c928714d6cfa8e4657876efb50607fe78339a3539978c88cf045cbc6b8d7932236b2aadbbcebb4f963c1d82fc9f9fb3a7a1a5"' : 'data-bs-target="#xs-components-links-module-HomePageModule-914c38f0586896c2dbf9efef201c928714d6cfa8e4657876efb50607fe78339a3539978c88cf045cbc6b8d7932236b2aadbbcebb4f963c1d82fc9f9fb3a7a1a5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-914c38f0586896c2dbf9efef201c928714d6cfa8e4657876efb50607fe78339a3539978c88cf045cbc6b8d7932236b2aadbbcebb4f963c1d82fc9f9fb3a7a1a5"' :
                                            'id="xs-components-links-module-HomePageModule-914c38f0586896c2dbf9efef201c928714d6cfa8e4657876efb50607fe78339a3539978c88cf045cbc6b8d7932236b2aadbbcebb4f963c1d82fc9f9fb3a7a1a5"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProviderItemSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProviderItemSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProviderSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProviderSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpentFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpentFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpentItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpentItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VehicleFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehicleFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VehicleItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehicleItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-857d449452789564b2a8624d163e58da6dd760c7880275822a755b86a6db248c1758c4c144bde56786508d4acf19559be1d73394302e9f6510749fe47c60962b"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-857d449452789564b2a8624d163e58da6dd760c7880275822a755b86a6db248c1758c4c144bde56786508d4acf19559be1d73394302e9f6510749fe47c60962b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-857d449452789564b2a8624d163e58da6dd760c7880275822a755b86a6db248c1758c4c144bde56786508d4acf19559be1d73394302e9f6510749fe47c60962b"' :
                                            'id="xs-components-links-module-LoginPageModule-857d449452789564b2a8624d163e58da6dd760c7880275822a755b86a6db248c1758c4c144bde56786508d4acf19559be1d73394302e9f6510749fe47c60962b"' }>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProvidersPageModule.html" data-type="entity-link" >ProvidersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProvidersPageModule-a9a3bb22f89f05456362361bd678b79c778e28c03fa3fbbd4aff590657e198e70f743ef27854ddbfa1aeeaf6b448f88308240faadd7aaf57a324f82e2e2c053e"' : 'data-bs-target="#xs-components-links-module-ProvidersPageModule-a9a3bb22f89f05456362361bd678b79c778e28c03fa3fbbd4aff590657e198e70f743ef27854ddbfa1aeeaf6b448f88308240faadd7aaf57a324f82e2e2c053e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProvidersPageModule-a9a3bb22f89f05456362361bd678b79c778e28c03fa3fbbd4aff590657e198e70f743ef27854ddbfa1aeeaf6b448f88308240faadd7aaf57a324f82e2e2c053e"' :
                                            'id="xs-components-links-module-ProvidersPageModule-a9a3bb22f89f05456362361bd678b79c778e28c03fa3fbbd4aff590657e198e70f743ef27854ddbfa1aeeaf6b448f88308240faadd7aaf57a324f82e2e2c053e"' }>
                                            <li class="link">
                                                <a href="components/ProviderItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProviderItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProvidersFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProvidersFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProvidersPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProvidersPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProvidersPageRoutingModule.html" data-type="entity-link" >ProvidersPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link" >RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterPageModule-3c63e535ce54bb253b4c1a986afc2da11c46d8f765dce0f7369ceaa7c23e23016b9623048dbe4a6043f0f020584dc792b631c85a71c6ec1c5b9c0d51806fecfd"' : 'data-bs-target="#xs-components-links-module-RegisterPageModule-3c63e535ce54bb253b4c1a986afc2da11c46d8f765dce0f7369ceaa7c23e23016b9623048dbe4a6043f0f020584dc792b631c85a71c6ec1c5b9c0d51806fecfd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-3c63e535ce54bb253b4c1a986afc2da11c46d8f765dce0f7369ceaa7c23e23016b9623048dbe4a6043f0f020584dc792b631c85a71c6ec1c5b9c0d51806fecfd"' :
                                            'id="xs-components-links-module-RegisterPageModule-3c63e535ce54bb253b4c1a986afc2da11c46d8f765dce0f7369ceaa7c23e23016b9623048dbe4a6043f0f020584dc792b631c85a71c6ec1c5b9c0d51806fecfd"' }>
                                            <li class="link">
                                                <a href="components/RegisterFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageRoutingModule.html" data-type="entity-link" >RegisterPageRoutingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterPageRoutingModule-2183722c9de1603f2c9d5541375439c9cce9112a2f660dd9f2d5cbd4618de13a4d310a1a4447c9f3530588f68d1962b1dfffd78dac5447e1e9ac043404992884"' : 'data-bs-target="#xs-components-links-module-RegisterPageRoutingModule-2183722c9de1603f2c9d5541375439c9cce9112a2f660dd9f2d5cbd4618de13a4d310a1a4447c9f3530588f68d1962b1dfffd78dac5447e1e9ac043404992884"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageRoutingModule-2183722c9de1603f2c9d5541375439c9cce9112a2f660dd9f2d5cbd4618de13a4d310a1a4447c9f3530588f68d1962b1dfffd78dac5447e1e9ac043404992884"' :
                                            'id="xs-components-links-module-RegisterPageRoutingModule-2183722c9de1603f2c9d5541375439c9cce9112a2f660dd9f2d5cbd4618de13a4d310a1a4447c9f3530588f68d1962b1dfffd78dac5447e1e9ac043404992884"' }>
                                            <li class="link">
                                                <a href="components/PasswordStrengthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordStrengthComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' : 'data-bs-target="#xs-components-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' :
                                            'id="xs-components-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' }>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' : 'data-bs-target="#xs-directives-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' :
                                        'id="xs-directives-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' }>
                                        <li class="link">
                                            <a href="directives/ButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ItemDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SelectedCardDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectedCardDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' :
                                            'id="xs-pipes-links-module-SharedModule-9fe1918b633b99172c3783917107b951d04edcb74baffae0a21aa9682dd10f0181a89ff5eb478fcb9ee0285c14b0f45fe76d144ec20694d67d65425af1931691"' }>
                                            <li class="link">
                                                <a href="pipes/CapitalizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapitalizePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NumberFormatPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberFormatPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/UpperCamelCasePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpperCamelCasePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VehiclesPageModule.html" data-type="entity-link" >VehiclesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VehiclesPageModule-f49a9070d6a9d5e0be69afcf73581acd9258f1e4326d8dbf7194ae3a08810a22a8e4c2f01f25f547445884670d51b4b79f9728609bb8de78256ac54e2ebf3b44"' : 'data-bs-target="#xs-components-links-module-VehiclesPageModule-f49a9070d6a9d5e0be69afcf73581acd9258f1e4326d8dbf7194ae3a08810a22a8e4c2f01f25f547445884670d51b4b79f9728609bb8de78256ac54e2ebf3b44"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VehiclesPageModule-f49a9070d6a9d5e0be69afcf73581acd9258f1e4326d8dbf7194ae3a08810a22a8e4c2f01f25f547445884670d51b4b79f9728609bb8de78256ac54e2ebf3b44"' :
                                            'id="xs-components-links-module-VehiclesPageModule-f49a9070d6a9d5e0be69afcf73581acd9258f1e4326d8dbf7194ae3a08810a22a8e4c2f01f25f547445884670d51b4b79f9728609bb8de78256ac54e2ebf3b44"' }>
                                            <li class="link">
                                                <a href="components/VehicleItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehicleItemListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VehiclesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VehiclesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VehiclesPageRoutingModule.html" data-type="entity-link" >VehiclesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WelcomePageModule.html" data-type="entity-link" >WelcomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-WelcomePageModule-1ef2106dbd3fda4c5b8382dd587a50d0284a8d3547eec895148d96d2457c56e7afcfc7d9b9ffa580ff8eba4d9e85e58123afa19b58f24842e3f866a1d3b0f23a"' : 'data-bs-target="#xs-components-links-module-WelcomePageModule-1ef2106dbd3fda4c5b8382dd587a50d0284a8d3547eec895148d96d2457c56e7afcfc7d9b9ffa580ff8eba4d9e85e58123afa19b58f24842e3f866a1d3b0f23a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WelcomePageModule-1ef2106dbd3fda4c5b8382dd587a50d0284a8d3547eec895148d96d2457c56e7afcfc7d9b9ffa580ff8eba4d9e85e58123afa19b58f24842e3f866a1d3b0f23a"' :
                                            'id="xs-components-links-module-WelcomePageModule-1ef2106dbd3fda4c5b8382dd587a50d0284a8d3547eec895148d96d2457c56e7afcfc7d9b9ffa580ff8eba4d9e85e58123afa19b58f24842e3f866a1d3b0f23a"' }>
                                            <li class="link">
                                                <a href="components/WelcomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WelcomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WelcomePageRoutingModule.html" data-type="entity-link" >WelcomePageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FirebaseAuthService.html" data-type="entity-link" >FirebaseAuthService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseDataService.html" data-type="entity-link" >FirebaseDataService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyToast.html" data-type="entity-link" >MyToast</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidation.html" data-type="entity-link" >PasswordValidation</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link" >ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomTranslateService.html" data-type="entity-link" >CustomTranslateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseMappingService.html" data-type="entity-link" >FirebaseMappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseService.html" data-type="entity-link" >FirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseService-1.html" data-type="entity-link" >FirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientProvider.html" data-type="entity-link" >HttpClientProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientWebProvider.html" data-type="entity-link" >HttpClientWebProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalDataService.html" data-type="entity-link" >LocalDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MappingService.html" data-type="entity-link" >MappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProviderService.html" data-type="entity-link" >ProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProvidersPage.html" data-type="entity-link" >ProvidersPage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpentService.html" data-type="entity-link" >SpentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VehicleService.html" data-type="entity-link" >VehicleService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FirebaseDocument.html" data-type="entity-link" >FirebaseDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseStorageFile.html" data-type="entity-link" >FirebaseStorageFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseUserCredential.html" data-type="entity-link" >FirebaseUserCredential</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Provider.html" data-type="entity-link" >Provider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Spent.html" data-type="entity-link" >Spent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCredential.html" data-type="entity-link" >UserCredential</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCredentials.html" data-type="entity-link" >UserCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vehicle.html" data-type="entity-link" >Vehicle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VehiclePreview.html" data-type="entity-link" >VehiclePreview</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});