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
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-c51c1b4978fdeb4760ec091f4f9970ee1e9a93e8aba80dca2d179823d037ec5f35c439fbd840741613bf0d21ddb055ab957010d8895b4da5142d845473eb7dd7"' : 'data-bs-target="#xs-components-links-module-AppModule-c51c1b4978fdeb4760ec091f4f9970ee1e9a93e8aba80dca2d179823d037ec5f35c439fbd840741613bf0d21ddb055ab957010d8895b4da5142d845473eb7dd7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c51c1b4978fdeb4760ec091f4f9970ee1e9a93e8aba80dca2d179823d037ec5f35c439fbd840741613bf0d21ddb055ab957010d8895b4da5142d845473eb7dd7"' :
                                            'id="xs-components-links-module-AppModule-c51c1b4978fdeb4760ec091f4f9970ee1e9a93e8aba80dca2d179823d037ec5f35c439fbd840741613bf0d21ddb055ab957010d8895b4da5142d845473eb7dd7"' }>
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
                                            'data-bs-target="#components-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' : 'data-bs-target="#xs-components-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' :
                                            'id="xs-components-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' }>
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
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' : 'data-bs-target="#xs-injectables-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' :
                                        'id="xs-injectables-links-module-HomePageModule-83b61c4f62063252ae7f317d6291c1fb16cb7fd4cf9c83555e9b8336365948c822b20652cd2b86345a7afe2ca3f7ce26971c15acefc14c5fd90226be6429011c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthStrapiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthStrapiService</a>
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
                                            'data-bs-target="#components-links-module-LoginPageModule-67ac86fbc71d19e96f58b3645a95dcd6daccc3bba4bcfda372475c2d61882b00c27a152d6c8748174d059419982cf9a3b4664bbe7fc160e1c6d9048a195e7082"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-67ac86fbc71d19e96f58b3645a95dcd6daccc3bba4bcfda372475c2d61882b00c27a152d6c8748174d059419982cf9a3b4664bbe7fc160e1c6d9048a195e7082"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-67ac86fbc71d19e96f58b3645a95dcd6daccc3bba4bcfda372475c2d61882b00c27a152d6c8748174d059419982cf9a3b4664bbe7fc160e1c6d9048a195e7082"' :
                                            'id="xs-components-links-module-LoginPageModule-67ac86fbc71d19e96f58b3645a95dcd6daccc3bba4bcfda372475c2d61882b00c27a152d6c8748174d059419982cf9a3b4664bbe7fc160e1c6d9048a195e7082"' }>
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
                                            'data-bs-target="#components-links-module-ProvidersPageModule-cbcb0f9078e093a510e7e4620a3e1ae1f2d849cc22f14954be6bc3421a34c9a72867fe9f13999b08bfdee269315c0a943e701bf9d71e94740d3fa187ab555dd6"' : 'data-bs-target="#xs-components-links-module-ProvidersPageModule-cbcb0f9078e093a510e7e4620a3e1ae1f2d849cc22f14954be6bc3421a34c9a72867fe9f13999b08bfdee269315c0a943e701bf9d71e94740d3fa187ab555dd6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProvidersPageModule-cbcb0f9078e093a510e7e4620a3e1ae1f2d849cc22f14954be6bc3421a34c9a72867fe9f13999b08bfdee269315c0a943e701bf9d71e94740d3fa187ab555dd6"' :
                                            'id="xs-components-links-module-ProvidersPageModule-cbcb0f9078e093a510e7e4620a3e1ae1f2d849cc22f14954be6bc3421a34c9a72867fe9f13999b08bfdee269315c0a943e701bf9d71e94740d3fa187ab555dd6"' }>
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
                                            'data-bs-target="#components-links-module-RegisterPageModule-6c3cdf016b3f92235594173736063057faefd7f180adec6a644504a780251a1b791befc97a222b02cf0cb8c423a1604cc70efcdd0a37479a71cdacefe10390a8"' : 'data-bs-target="#xs-components-links-module-RegisterPageModule-6c3cdf016b3f92235594173736063057faefd7f180adec6a644504a780251a1b791befc97a222b02cf0cb8c423a1604cc70efcdd0a37479a71cdacefe10390a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-6c3cdf016b3f92235594173736063057faefd7f180adec6a644504a780251a1b791befc97a222b02cf0cb8c423a1604cc70efcdd0a37479a71cdacefe10390a8"' :
                                            'id="xs-components-links-module-RegisterPageModule-6c3cdf016b3f92235594173736063057faefd7f180adec6a644504a780251a1b791befc97a222b02cf0cb8c423a1604cc70efcdd0a37479a71cdacefe10390a8"' }>
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
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' : 'data-bs-target="#xs-components-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' :
                                            'id="xs-components-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' }>
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
                                        'data-bs-target="#directives-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' : 'data-bs-target="#xs-directives-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' :
                                        'id="xs-directives-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' }>
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
                                            'data-bs-target="#pipes-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' :
                                            'id="xs-pipes-links-module-SharedModule-e9adaf924ff3c5a30b850c7266cf05fcb279b86f1f5df4bc8e497435981da0b0d27c5f368f37424773faeabe6132ef3d0c25d75323622cdb3f9e3235e7fe6dd8"' }>
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
                                            'data-bs-target="#components-links-module-VehiclesPageModule-5a8502e8f6b52cb1f35d9bb68cde7c20b0647bef07103ea2f77efb949efa378d4e0148871bd1783d700ca9bc4d3e3db79f8ce55aa162378db66d0d107775cbfc"' : 'data-bs-target="#xs-components-links-module-VehiclesPageModule-5a8502e8f6b52cb1f35d9bb68cde7c20b0647bef07103ea2f77efb949efa378d4e0148871bd1783d700ca9bc4d3e3db79f8ce55aa162378db66d0d107775cbfc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VehiclesPageModule-5a8502e8f6b52cb1f35d9bb68cde7c20b0647bef07103ea2f77efb949efa378d4e0148871bd1783d700ca9bc4d3e3db79f8ce55aa162378db66d0d107775cbfc"' :
                                            'id="xs-components-links-module-VehiclesPageModule-5a8502e8f6b52cb1f35d9bb68cde7c20b0647bef07103ea2f77efb949efa378d4e0148871bd1783d700ca9bc4d3e3db79f8ce55aa162378db66d0d107775cbfc"' }>
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
                                            'data-bs-target="#components-links-module-WelcomePageModule-79482c5174b5d1f8c20bd360e1883d59f992934fb15bfc6e23e3709a4c7c756327b3ea7cd21284dfc1eb9b51ce9d8efd4357235e83ebb0875f85e63ae64f3b41"' : 'data-bs-target="#xs-components-links-module-WelcomePageModule-79482c5174b5d1f8c20bd360e1883d59f992934fb15bfc6e23e3709a4c7c756327b3ea7cd21284dfc1eb9b51ce9d8efd4357235e83ebb0875f85e63ae64f3b41"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WelcomePageModule-79482c5174b5d1f8c20bd360e1883d59f992934fb15bfc6e23e3709a4c7c756327b3ea7cd21284dfc1eb9b51ce9d8efd4357235e83ebb0875f85e63ae64f3b41"' :
                                            'id="xs-components-links-module-WelcomePageModule-79482c5174b5d1f8c20bd360e1883d59f992934fb15bfc6e23e3709a4c7c756327b3ea7cd21284dfc1eb9b51ce9d8efd4357235e83ebb0875f85e63ae64f3b41"' }>
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
                                    <a href="injectables/AuthStrapiService.html" data-type="entity-link" >AuthStrapiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomTranslateService.html" data-type="entity-link" >CustomTranslateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientProvider.html" data-type="entity-link" >HttpClientProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientWebProvider.html" data-type="entity-link" >HttpClientWebProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InternalUIService.html" data-type="entity-link" >InternalUIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtService.html" data-type="entity-link" >JwtService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MappingService.html" data-type="entity-link" >MappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProvidersService.html" data-type="entity-link" >ProvidersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpentsService.html" data-type="entity-link" >SpentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiDataService.html" data-type="entity-link" >StrapiDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiMappingService.html" data-type="entity-link" >StrapiMappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VehiclesService.html" data-type="entity-link" >VehiclesService</a>
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
                                <a href="interfaces/CrudProviders.html" data-type="entity-link" >CrudProviders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CrudSpents.html" data-type="entity-link" >CrudSpents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CrudVehicles.html" data-type="entity-link" >CrudVehicles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Details.html" data-type="entity-link" >Details</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error.html" data-type="entity-link" >Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtResponse.html" data-type="entity-link" >JwtResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatedData.html" data-type="entity-link" >PaginatedData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostStrapiRegister.html" data-type="entity-link" >PostStrapiRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostUser.html" data-type="entity-link" >PostUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostUserResponse.html" data-type="entity-link" >PostUserResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Provider.html" data-type="entity-link" >Provider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderItem.html" data-type="entity-link" >ProviderItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Spent.html" data-type="entity-link" >Spent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpentItem.html" data-type="entity-link" >SpentItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiArrayResponse.html" data-type="entity-link" >StrapiArrayResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiData.html" data-type="entity-link" >StrapiData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiLoginResponse.html" data-type="entity-link" >StrapiLoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiOwner.html" data-type="entity-link" >StrapiOwner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiProvider.html" data-type="entity-link" >StrapiProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiRegisterPayload.html" data-type="entity-link" >StrapiRegisterPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiRegisterUser.html" data-type="entity-link" >StrapiRegisterUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiResponse.html" data-type="entity-link" >StrapiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiResponse-1.html" data-type="entity-link" >StrapiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSpent.html" data-type="entity-link" >StrapiSpent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiUser.html" data-type="entity-link" >StrapiUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCredentials.html" data-type="entity-link" >UserCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegisterInfo.html" data-type="entity-link" >UserRegisterInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vehicle.html" data-type="entity-link" >Vehicle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VehicleItem.html" data-type="entity-link" >VehicleItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VehicleItemAttributes.html" data-type="entity-link" >VehicleItemAttributes</a>
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