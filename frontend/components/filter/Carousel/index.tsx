import React, { FunctionComponent, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Choice } from '../../../types';
import ChoiceComponent from '../Choice';
import styles from "./styles";
import FilterHeader from '../FilterHeader';

interface Props {
    /* The choices that the Carousel has */
    choices: [Choice],

    /* The title */
    title: string,

    /* The description placed under the header */
    description: string,

    /* Whether this carousel is required */
    required?: boolean,

    selectedChoice: number,
    onChange: (choice: number) => void,
}


const Carousel: FunctionComponent<Props> = (props) => {

    return (
        <View style={styles.container}>
            <FilterHeader
                title={props.title}
                description={props.description}
                callback={() => props.onChange(-1)}
                required={props.required}
            />

            <FlatList
                style={styles.list}
                data={props.choices}
                renderItem={({ item, index }) => <ChoiceComponent choice={item} onPress={(event) => index === props.selectedChoice ? props.onChange(-1) : props.onChange(index)} selected={props.selectedChoice === index} />}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerContent}
                horizontal
            />
        </View>);

}

Carousel.defaultProps = {
    required: true
}

export default Carousel;