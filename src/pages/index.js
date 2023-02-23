import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'
import classNames from 'classnames'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  function TodoItem({ item, onCheck }) {
    const handleChange = () => {
      onCheck(item);
    }

    return (
      <label className='panel-block'>
        <input
          type='checkbox'
          checked={item.done}
          onChange={handleChange}
        />
        <span className={classNames({
          'has-text-grey-light': item.done
        })}
        >
          {item.text}
        </span>
      </label>
    )
  }

  function Todo() {
    const getKey = () => Math.random().toString(32).substring(2);
    const [items, setItems] = React.useState([
      { key: getKey(), text: 'Example Item', done: false },
    ]);

    const handleCheck = checked => {
      const newItems = items.map(item => {
        if (item.key === checked.key) {
          item.done = !item.done;
        }
        return item;
      });
      setItems(newItems);
    };

    const handleAdd = text => {
      setItems([...items, {key: getKey(), text, done: false}])
    };

    const [filter, setFilter] = React.useState('ALL');

    const handleFilterChange = value => setFilter(value);

    const displayItems = items.filter(item => {
      if (filter === 'ALL') return true;
      if (filter === 'TODO') return !item.done;
      if (filter === 'DONE') return item.done;
    });

    return (
      <div className='panel'>
        <div className='panel-heading'>
          React Todo
        </div>

        <Input onAdd={handleAdd} />

        <Filter
          onChange={handleFilterChange}
          value={filter}
        />

        {displayItems.map(item => (
          <TodoItem
            key={item.key}
            item={item}
            onCheck={handleCheck}
          />
        ))}
        <div className='panel-block'>
          {displayItems.length} items.
        </div>
      </div>
    );
  }

  function Input({ onAdd }) {
    const [text, setText] = React.useState('');

    const handleChange = e => setText(e.target.value);

    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        onAdd(text);
        setText('');
      }
    };

    return (
      <div className='panel-block'>
        <input
          className='input'
          type='text'
          placeholder='Enter to add'
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }

  function Filter({ value, onChange }) {
    const handleClick = (key, e) => {
      e.preventDefault();
      onChange(key);
    }

    return (
      <div className='panel-tabs'>
        <a
          href='#'
          onClick={handleClick.bind(null, 'ALL')}
          className={classNames({ 'is-active': value === 'ALL'})}
        >
          ALL
        </a>
        <a
          href='#'
          onClick={handleClick.bind(null, 'TODO')}
          className={classNames({ 'is-active': value === 'TODO'})}
        >
          TODO
        </a>
        <a
          href='#'
          onClick={handleClick.bind(null, 'DONE')}
          className={classNames({ 'is-active': value === 'DONE'})}
        >
          DONE
        </a>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.2/css/bulma.min.css" />
      </Head>
      <main className='is-fluid'>
        <Todo />
      </main>
    </>
  )
}
