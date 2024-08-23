import React from 'react';
import {ErrorStyles} from '../styles/Global'
import {ApolloError} from "@apollo/client";

type ErrorProps = {
    error: ApolloError | string | undefined
}

export const DisplayError: React.FC<ErrorProps> = ({ error }: ErrorProps) => {
    if (!error) return  null

      return (
        <ErrorStyles>
          <>
            <strong>Shoot!</strong>
            {/*{error.message.replace('GraphQL error: ', '')}*/}
              {error}
          </>
        </ErrorStyles>
      );
};
