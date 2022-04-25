import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isArray from '../functions/isArray';
import isFunction from '../functions/isFunction';
import isNumber from '../functions/isNumber';
import uuid from '../functions/uuid';

interface SP {
    [key: string]: any;
}

export default class PagerDiv extends React.Component<SP, SP> {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            max: 1,
            data: isArray(props.data) && 0 !== props.data.length ? props.data : [],
            itemsPerPage: isNumber(props.itemsPerPage) ? props.itemsPerPage : 10,
            loadingIcon: props.loadingIcon ? props.loadingIcon : '',
            uid: `${uuid()}`
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['data', 'itemsPerPage', 'pageCallback', 'loadingIcon'], props, state)) {
            const itemsPerPage = isNumber(props.itemsPerPage) ? props.itemsPerPage : 10;
            let max = isArray(props.data) && 0 !== props.data.length ? Math.ceil((props.data.length-1)/itemsPerPage): 1;

            if(!max) {
                max = 1;
            }

            return {
                data: isArray(props.data) && 0 !== props.data.length ? props.data : [],
                pageCallback: isFunction(props.pageCallback) ? props.pageCallback: undefined,
                loadingIcon: props.loadingIcon ? props.loadingIcon : '',
                itemsPerPage,
                max,
                page: state.page > max ? state.page-1 : state.page
            };
        }

        return null;
    }

    componentDidMount(): void {

        const max = isArray(this.state.data) && 0 !== this.state.data.length ? Math.ceil((this.state.data.length-1)/this.state.itemsPerPage): 1;

        this.setState({ max });
    }

    page(x: number){
        this.setState({
            page: x
        });
    }

    pager(){
        const { page, uid } = this.state;
        let { max } = this.state;

        if(!max) {
            max = 1;
        }

        const pages = [];

        for(let x = 1; x <= max; x++){
            pages.push(
                <li 
                    key={`page-${x}-${uid}`}
                    className='flex cursor-pointer page-item page-link'
                    {...(page === x) && { className: 'flex cursor-pointer page-item page-link active' }}
                    {...(x !== page) && { onClick: () => this.page(x) }}
                >
                    <span className='d-inline-block m-auto'>
                        {
                            x
                        }
                    </span>
                </li>
            );
        }

        return (
            <div className='divpage-pagination-wrapper flex justify-content-between w-100 p-2'>
                <div className='flex'>
                    <div className='flex'>
                        <span className='m-auto text-muted'>
                            {
                                page
                            }
                        </span>
                    </div>
                    <div className='flex'>
                        <span className='m-auto text-muted'>
                            /
                        </span>
                    </div>
                    <div className='flex'>
                        <span className='m-auto text-muted'>
                            {
                                max
                            }
                        </span>
                    </div>
                </div>
                <ul className='divpager-pagination flex'>
                    <li 
                        className='flex page-item d-none'
                        {...(page !== 1) && { 
                            onClick: () => this.page(1),
                            className: 'flex page-item cursor-pointer'
                        }}
                    >
                        <span 
                            className='d-inline-block m-auto page-link'
                            {...(page === 1) && { className: 'd-inline-block m-auto page-link text-muted' }}
                        >
                            {
                                `<<`
                            }    
                        </span>
                    </li>
                    <li 
                        className='flex page-item d-none'
                        {...(page !== 1) && { 
                            onClick: () => this.page(page-1),
                            className: 'flex page-item cursor-pointer' 
                        }}
                    >
                        <span 
                            className='d-inline-block m-auto page-link'
                            {...(page === 1) && { className: 'd-inline-block m-auto page-link text-muted' }}
                        >
                            {
                                `<`
                            }    
                        </span>
                    </li>
                    {
                        1 !== pages.length && pages
                    }
                    <li 
                        className='flex page-item d-none'
                        {...(page !== max) && { 
                            onClick: () => this.page(page+1),
                            className: 'flex page-item cursor-pointer' 
                        }}
                    >
                        <span 
                            className='d-inline-block m-auto page-link'
                            {...(page === max) && { className: 'd-inline-block m-auto page-link text-muted' }}
                        >
                            {
                                `>`
                            }    
                        </span>
                    </li>
                    <li 
                        className='flex page-item d-none'
                        {...(page !== max) && { 
                            onClick: () => this.page(max),
                            className: 'flex page-item cursor-pointer' 
                        }}
                    >
                        <span 
                            className='d-inline-block m-auto page-link'
                            {...(page === max) && { className: 'd-inline-block m-auto page-link text-muted' }}
                        >
                            {
                                `>>`
                            }    
                        </span>
                    </li>
                </ul>
            </div>
        ); 
    }

    data(){
        const { page, itemsPerPage, data } = this.state;
        const start = ((page-1) * itemsPerPage);
        const end = start + itemsPerPage;

        return data.map( (jsx, index) => {
            if(index >= start && index <= end){
                return jsx;
            }
        })
    }

    render() {
        return (
            <div className='Divpager row w-100'>
                {
                    this.pager()
                }
                {
                    !this.state.loading && this.data()
                }
                {
                    this.state.loading && this.state.loadingIcon
                }
            </div>
        );
    }
}
