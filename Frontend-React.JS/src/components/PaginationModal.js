import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { returnPaginationRange} from "../utils/paginationRange"

import './ConfirmModal.scss';
import * as actions from "../store/actions";
import { KeyCodeUtils } from "../utils";

class PaginationModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        const { items } = this.state
        const { totalPages } = this.props
        for (let i = 1; i <= totalPages; i++) {
            items.push(i);
        }
        this.setState({ items })
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { contentOfConfirmModal, totalPages, current, limit, siblings } = this.props;
        const { items } = this.state;
        let array = returnPaginationRange(totalPages, current, limit, siblings);
        return (
            <Pagination>
                {current === 1 ? 
                    <PaginationItem disabled>
                        <PaginationLink
                            onClick={ () => this.props.onChangePage("previous")}
                            previous
                        />
                    </PaginationItem>
                    :
                    <PaginationItem >
                    <PaginationLink
                    onClick={ () => this.props.onChangePage("previous")}
                    previous
                    />
                </PaginationItem>}
                {/* {items.map(index => { 
                    return (
                        <PaginationItem key={ index}>
                            <PaginationLink onClick={ () => this.props.onChangePage(index)}>
                                {index}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })} */}
                {array.map(value => { 
                    if (current === value) {
                        return (
                            <PaginationItem key={value} active >
                                <PaginationLink onClick={() => this.props.onChangePage(value)}>
                                    {value}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    } else { 
                        return (
                            <PaginationItem key={value}>
                                <PaginationLink onClick={() => this.props.onChangePage(value)}>
                                    {value}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                })}

                {current === totalPages ? 
                    <PaginationItem disabled>
                    <PaginationLink
                    onClick={ () => this.props.onChangePage("next")}
                    next
                    />
                </PaginationItem>
                    :
                    <PaginationItem>
                    <PaginationLink
                    onClick={ () => this.props.onChangePage("next")}
                    next
                    />
                </PaginationItem>}
                
            </Pagination>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationModal);
