import React from 'react';

import isString from '../functions/isString';
import isNumber from '../functions/isNumber';

export default class ContainerPack extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props) {
        super(props);
        this.resizeView = this.resizeView.bind(this);

        this.state = {
            mounted: false,
            sidebar: false,
            pack: false,
            /**
             * User
             */
            sidebarAt: isNumber(props.sidebarAt) ? props.sidebarAt : 1024,
            packAt: isNumber(props.packAt) ? props.packAt : 1024,
            headerData: props.headerData ? props.headerData : '',
            contentData: props.contentData ? props.contentData : '',
            sidebarData: props.sidebarData ? props.sidebarData : '',
            packData: props.packData ? props.packData : '',
            align: isString(props.align) ? props.align : 'left',
        };
    }

    componentDidMount(): void {

        window.addEventListener('resize', this.resizeView);
        this.resizeView();

        this.setState(
            {
                mounted: true
            },
            this.resizeView
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeView);
    }

    resizeView() {
        const { sidebarAt, packAt } = this.state;
        const docWidth = document.documentElement.getBoundingClientRect().width;

        if (docWidth >= packAt) {
            if(true !== this.state.pack){
                this.setState({ pack: true });
            }
        } else {
            if(false !== this.state.pack){
                this.setState({ pack: false });
            }
        }

        if (docWidth >= sidebarAt) {
            if(true !== this.state.sidebar){
                this.setState({ sidebar: true });
            }
        } else {
            if(false !== this.state.sidebar){
                this.setState({ sidebar: false });
            }
        }
    }

    render() {
        const { headerData, contentData, align } = this.state;
        const direction = ['left', 'right'].includes(align) ? align : 'left';

        return (
            <div 
                {...('left' === direction && { className: 'ContainerPack left' })} 
                {...('right' === direction && { className: 'ContainerPack right' })} 
                {...('left' === direction && !this.state.mounted && { className: 'ContainerPack left td0' })} 
                {...('right' === direction && !this.state.mounted && { className: 'ContainerPack right td0' })} 
            
            >
                <div className='area-header position-sticky top-0'>
                    {
                        headerData
                    }
                </div>
                <div className="pack-content flex flex-row w-100">
                    {
                        this.state.sidebar &&
                        <div className="area-sidebar bg-transparent p-0">
                            <div className="area-sidebar-data bg-transparent position-relative">
                                <div className='position-absolute w-100 h-100'>
                                    {
                                        this.state.sidebarData
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div className="area-content w-100">
                        {
                            contentData
                        }
                    </div>
                    {
                        this.state.pack && 
                        <div className="area-pack bg-transparent p-0">
                            <div className="area-pack-data bg-transparent position-relative">
                                <div className='position-absolute w-100 h-100'>
                                    {
                                        this.state.packData
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
