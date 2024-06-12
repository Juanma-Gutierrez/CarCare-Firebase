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
                                            'data-bs-target="#components-links-module-AboutMePageModule-7c4ed4dce7ebbbfb3b37db0c519982484253da4ec44ad43ccd4356d4c1e06a738311115ec989cbcf281e8f23b99a8d3f4b5fd002f115aa1e6096a8071347703c"' : 'data-bs-target="#xs-components-links-module-AboutMePageModule-7c4ed4dce7ebbbfb3b37db0c519982484253da4ec44ad43ccd4356d4c1e06a738311115ec989cbcf281e8f23b99a8d3f4b5fd002f115aa1e6096a8071347703c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutMePageModule-7c4ed4dce7ebbbfb3b37db0c519982484253da4ec44ad43ccd4356d4c1e06a738311115ec989cbcf281e8f23b99a8d3f4b5fd002f115aa1e6096a8071347703c"' :
                                            'id="xs-components-links-module-AboutMePageModule-7c4ed4dce7ebbbfb3b37db0c519982484253da4ec44ad43ccd4356d4c1e06a738311115ec989cbcf281e8f23b99a8d3f4b5fd002f115aa1e6096a8071347703c"' }>
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
                                            'data-bs-target="#components-links-module-AdminPageModule-fb7cba51c139a775f98bd95e48e3fade5d83d00d5d2a2862ed083c53a85be305e0c3b8e99db62ce1a00b46cf9d102805afef945e874a8a66d8bc8c183f34d6c7"' : 'data-bs-target="#xs-components-links-module-AdminPageModule-fb7cba51c139a775f98bd95e48e3fade5d83d00d5d2a2862ed083c53a85be305e0c3b8e99db62ce1a00b46cf9d102805afef945e874a8a66d8bc8c183f34d6c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPageModule-fb7cba51c139a775f98bd95e48e3fade5d83d00d5d2a2862ed083c53a85be305e0c3b8e99db62ce1a00b46cf9d102805afef945e874a8a66d8bc8c183f34d6c7"' :
                                            'id="xs-components-links-module-AdminPageModule-fb7cba51c139a775f98bd95e48e3fade5d83d00d5d2a2862ed083c53a85be305e0c3b8e99db62ce1a00b46cf9d102805afef945e874a8a66d8bc8c183f34d6c7"' }>
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
                                            'data-bs-target="#components-links-module-AppModule-27bb3d48d381ab33acebb7f4920943d5914fdd4b39f3d2a4229ac986672d61e20d3bfa2bb6d29242f272bc42e792c0543f805af1b99434c8183423eb278c63c0"' : 'data-bs-target="#xs-components-links-module-AppModule-27bb3d48d381ab33acebb7f4920943d5914fdd4b39f3d2a4229ac986672d61e20d3bfa2bb6d29242f272bc42e792c0543f805af1b99434c8183423eb278c63c0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-27bb3d48d381ab33acebb7f4920943d5914fdd4b39f3d2a4229ac986672d61e20d3bfa2bb6d29242f272bc42e792c0543f805af1b99434c8183423eb278c63c0"' :
                                            'id="xs-components-links-module-AppModule-27bb3d48d381ab33acebb7f4920943d5914fdd4b39f3d2a4229ac986672d61e20d3bfa2bb6d29242f272bc42e792c0543f805af1b99434c8183423eb278c63c0"' }>
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
                                            'data-bs-target="#components-links-module-HomePageModule-6c03ea79cbe65d5dd769451d9681a5d9a68fa6ceaefd5a37c23571d0b4fea6f652f35ada0b473af4b0e530d67d58cbc6ea4d4b8db6a982bffdf3b1c7c2a9eb0a"' : 'data-bs-target="#xs-components-links-module-HomePageModule-6c03ea79cbe65d5dd769451d9681a5d9a68fa6ceaefd5a37c23571d0b4fea6f652f35ada0b473af4b0e530d67d58cbc6ea4d4b8db6a982bffdf3b1c7c2a9eb0a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-6c03ea79cbe65d5dd769451d9681a5d9a68fa6ceaefd5a37c23571d0b4fea6f652f35ada0b473af4b0e530d67d58cbc6ea4d4b8db6a982bffdf3b1c7c2a9eb0a"' :
                                            'id="xs-components-links-module-HomePageModule-6c03ea79cbe65d5dd769451d9681a5d9a68fa6ceaefd5a37c23571d0b4fea6f652f35ada0b473af4b0e530d67d58cbc6ea4d4b8db6a982bffdf3b1c7c2a9eb0a"' }>
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
                                            'data-bs-target="#components-links-module-LoginPageModule-b062b3e17987a317a3adae368d0b940ad6e0e3de64c627963906ba2b8560abef111fe16097d5ebd9f31b3cbb82cbd0796c9a587ef05c91c592e77b17239c902c"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-b062b3e17987a317a3adae368d0b940ad6e0e3de64c627963906ba2b8560abef111fe16097d5ebd9f31b3cbb82cbd0796c9a587ef05c91c592e77b17239c902c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-b062b3e17987a317a3adae368d0b940ad6e0e3de64c627963906ba2b8560abef111fe16097d5ebd9f31b3cbb82cbd0796c9a587ef05c91c592e77b17239c902c"' :
                                            'id="xs-components-links-module-LoginPageModule-b062b3e17987a317a3adae368d0b940ad6e0e3de64c627963906ba2b8560abef111fe16097d5ebd9f31b3cbb82cbd0796c9a587ef05c91c592e77b17239c902c"' }>
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
                                            'data-bs-target="#components-links-module-ProvidersPageModule-41dd55b16767faaf3da353f9a7659c124074f79b3cf30b03d5f7c8aaf64fdfa0f78e1e02ae293e35f4ec772a70f0e05b1fed7300324ee9f7970cdf8445e97217"' : 'data-bs-target="#xs-components-links-module-ProvidersPageModule-41dd55b16767faaf3da353f9a7659c124074f79b3cf30b03d5f7c8aaf64fdfa0f78e1e02ae293e35f4ec772a70f0e05b1fed7300324ee9f7970cdf8445e97217"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProvidersPageModule-41dd55b16767faaf3da353f9a7659c124074f79b3cf30b03d5f7c8aaf64fdfa0f78e1e02ae293e35f4ec772a70f0e05b1fed7300324ee9f7970cdf8445e97217"' :
                                            'id="xs-components-links-module-ProvidersPageModule-41dd55b16767faaf3da353f9a7659c124074f79b3cf30b03d5f7c8aaf64fdfa0f78e1e02ae293e35f4ec772a70f0e05b1fed7300324ee9f7970cdf8445e97217"' }>
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
                                            'data-bs-target="#components-links-module-RegisterPageModule-6551c60b7088864399754a8a9720d1022246052d553d12c0f98ceb657d69c1f0031360e249483b21e3a05eca8b130c8bb18546dc64eb2eff14707a1a3e3d4e52"' : 'data-bs-target="#xs-components-links-module-RegisterPageModule-6551c60b7088864399754a8a9720d1022246052d553d12c0f98ceb657d69c1f0031360e249483b21e3a05eca8b130c8bb18546dc64eb2eff14707a1a3e3d4e52"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-6551c60b7088864399754a8a9720d1022246052d553d12c0f98ceb657d69c1f0031360e249483b21e3a05eca8b130c8bb18546dc64eb2eff14707a1a3e3d4e52"' :
                                            'id="xs-components-links-module-RegisterPageModule-6551c60b7088864399754a8a9720d1022246052d553d12c0f98ceb657d69c1f0031360e249483b21e3a05eca8b130c8bb18546dc64eb2eff14707a1a3e3d4e52"' }>
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
                                            'data-bs-target="#components-links-module-RegisterPageRoutingModule-d64d4f3f69458a7864881293fee1b010c369a87caf90e2fa28f9c1c69beec43056bdd2996ab1d3dfeb5d683e7a69238d1c805a39182563509bda5ee93f4c2b55"' : 'data-bs-target="#xs-components-links-module-RegisterPageRoutingModule-d64d4f3f69458a7864881293fee1b010c369a87caf90e2fa28f9c1c69beec43056bdd2996ab1d3dfeb5d683e7a69238d1c805a39182563509bda5ee93f4c2b55"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageRoutingModule-d64d4f3f69458a7864881293fee1b010c369a87caf90e2fa28f9c1c69beec43056bdd2996ab1d3dfeb5d683e7a69238d1c805a39182563509bda5ee93f4c2b55"' :
                                            'id="xs-components-links-module-RegisterPageRoutingModule-d64d4f3f69458a7864881293fee1b010c369a87caf90e2fa28f9c1c69beec43056bdd2996ab1d3dfeb5d683e7a69238d1c805a39182563509bda5ee93f4c2b55"' }>
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
                                            'data-bs-target="#components-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' : 'data-bs-target="#xs-components-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' :
                                            'id="xs-components-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' }>
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
                                        'data-bs-target="#directives-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' : 'data-bs-target="#xs-directives-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' :
                                        'id="xs-directives-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' }>
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
                                            'data-bs-target="#pipes-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' :
                                            'id="xs-pipes-links-module-SharedModule-0337d9446f93b5335e11fe17cbeb17486bb2d4f3ccf64085a48520c9d1953d0e937aee9926ab31cb89438177d1dc0cd44d39804ef83f6bb0327ba98de9c6913e"' }>
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
                                            'data-bs-target="#components-links-module-VehiclesPageModule-7c9c028ace65c0f97cce33f062aae432420324161d73ebc3e9925ebb74f50a5feffda9ceabf689067991d93e799cf400c84dfd37b6714c23e50008f8b1b491cf"' : 'data-bs-target="#xs-components-links-module-VehiclesPageModule-7c9c028ace65c0f97cce33f062aae432420324161d73ebc3e9925ebb74f50a5feffda9ceabf689067991d93e799cf400c84dfd37b6714c23e50008f8b1b491cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VehiclesPageModule-7c9c028ace65c0f97cce33f062aae432420324161d73ebc3e9925ebb74f50a5feffda9ceabf689067991d93e799cf400c84dfd37b6714c23e50008f8b1b491cf"' :
                                            'id="xs-components-links-module-VehiclesPageModule-7c9c028ace65c0f97cce33f062aae432420324161d73ebc3e9925ebb74f50a5feffda9ceabf689067991d93e799cf400c84dfd37b6714c23e50008f8b1b491cf"' }>
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
                                            'data-bs-target="#components-links-module-WelcomePageModule-78e05a3c3e11c4b910bac2787bad05f120229272ae7dc77ddd9b2640ae4119d4029471779e516801dec3572ba778f258f68b42e449540ef82f7afdefb7520d37"' : 'data-bs-target="#xs-components-links-module-WelcomePageModule-78e05a3c3e11c4b910bac2787bad05f120229272ae7dc77ddd9b2640ae4119d4029471779e516801dec3572ba778f258f68b42e449540ef82f7afdefb7520d37"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WelcomePageModule-78e05a3c3e11c4b910bac2787bad05f120229272ae7dc77ddd9b2640ae4119d4029471779e516801dec3572ba778f258f68b42e449540ef82f7afdefb7520d37"' :
                                            'id="xs-components-links-module-WelcomePageModule-78e05a3c3e11c4b910bac2787bad05f120229272ae7dc77ddd9b2640ae4119d4029471779e516801dec3572ba778f258f68b42e449540ef82f7afdefb7520d37"' }>
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
                                <a href="classes/Mapping.html" data-type="entity-link" >Mapping</a>
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
                                <a href="interfaces/ItemLog.html" data-type="entity-link" >ItemLog</a>
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