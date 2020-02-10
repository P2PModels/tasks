import React from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  Main,
  SyncIndicator,
  Tabs,
  Text,
  textStyle,
  DataView,
  ContextMenu,
  ContextMenuItem,
} from '@aragon/ui'
import styled from 'styled-components'

function App() {
  const { api, appState, path, requestPath } = useAragonApi()
  const { tasks, isSyncing } = appState

  const pathParts = path.match(/^\/tab\/([0-9]+)/)
  const pageIndex = Array.isArray(pathParts)
    ? parseInt(pathParts[1], 10) - 1
    : 0

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Tasks"
        secondary={
          <Text
            css={`
              ${textStyle('title2')}
            `}
          >
            {tasks.length}
          </Text>
        }
      />
      <Tabs
        items={['Tab 1', 'Tab 2']}
        selected={pageIndex}
        onChange={index => requestPath(`/tab/${index + 1}`)}
      />
      <Box>
        <DataView
        fields={['Task name', 'Priority', 'Status']}
        entries={tasks}
        renderEntry={({ id, name, priority, complete }) => {
            return [
              '#' + id + ' ' + name,
              priority,
              complete ? 'Complete' : 'Pending',
            ]
          }}
          renderEntryActions={entry => (
            <ContextMenu>
              <ContextMenuItem onClick={() => api.deleteTask(entry.id).toPromise()}>
                Delete
              </ContextMenuItem>
              <ContextMenuItem onClick={() => api.completeTask(entry.id).toPromise()}>Complete</ContextMenuItem>
            </ContextMenu>
          )}
      />
        <Buttons>
          <Button
            display="icon"
            icon={<IconMinus />}
            label="Decrement"
            onClick={() => api.decrement(1).toPromise()}
          />
          <Button
            display="icon"
            icon={<IconPlus />}
            label="Increment"
            onClick={() => api.increment(1).toPromise()}
            css={`
              margin-left: ${2 * GU}px;
            `}
          />
        </Buttons>
      </Box>
    </Main>
  )
}

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin-top: 20px;
`

export default App
