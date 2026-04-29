'use client'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Input,
  Modal,
  Avatar,
} from '@/components/ui'
import {
  MOCK_USERS,
  MOCK_USER_ROLES,
  MOCK_TRANSACTIONS,
  MOCK_ACCOUNTS,
} from '@/lib/data'
import { UserAuthenticationIcon as Icon } from 'lucide-react'
import { cn } from 'clsx'
import tailwindMerge from 'tailwind-merge'
import { useEffect, useState } from 'react'

const featureHeaderStyles = tailwindMerge(
  'text-zinc-900 bg-zinc-50 rounded-md shadow-md p-4'
)

const cardStyles = tailwindMerge(
  'bg-white border border-zinc-200 rounded-xl shadow-sm mx-2 mt-4'
)

const badgeStyles = tailwindMerge(
  'bg-emerald-50 border-emerald-200 rounded-full p-2 text-emerald-600'
)

function UserAuthenticationPage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const filterUsers = MOCK_USERS.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (!selectedUser) {
      setSelectedUser(filterUsers[0])
    }
  }, [searchQuery, selectedUser])

  useEffect(() => {
    const filteredAccounts = MOCK_ACCOUNTS.filter((account) =>
      account.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (!selectedAccount) {
      setSelectedAccount(filteredAccounts[0])
    }
  }, [searchQuery, selectedAccount])

  const handleSelectAccount = (id: string) => {
    const selected = MOCK_ACCOUNTS.find((account) => account.id === id)
    setSelectedAccount(selected)
  }

  const handleSelectUser = (id: string) => {
    const selected = MOCK_USERS.find((user) => user.id === id)
    setSelectedUser(selected)
  }

  const handleFilterByRole = (role: string) => {
    return MOCK_USERS.filter((user) => user.role === role)
  }

  return (
    <div className={featureHeaderStyles}>
      <CardTitle>Automated Bookkeeper - User Authentication</CardTitle>
      <CardHeader>
        <Badge style={badgeStyles}>
          {selectedAccount ? selectedAccount.type : ''}
        </Badge>
      </CardHeader>
      <CardContent className={cardStyles}>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <CardTitle>Users</CardTitle>
            <div className="grid grid-cols-1 gap-4 xl:gap-6 lg:grid-cols-2 lg:gap-4 md:grid-cols-2 md:gap-4">
              {MOCK_USERS.map((user, index) => (
                <Card key={index} className={cardStyles}>
                  <CardHeader>
                    <Avatar size="medium" src={'/image.jpg'} />
                    <div className="ml-4">
                      <CardTitle>{user.name}</CardTitle>
                      <Badge style={badgeStyles}>
                        {user.role === 'Admin' ? 'Admin' : 'User'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={tailwindMerge('p-4')}>
                    <p className="text-zinc-600">
                      {selectedUser ? selectedUser.id : 'Select User'}
                    </p>
                    <p className="text-zinc-600">
                      {selectedAccount ? selectedAccount.id : 'Select Account'}
                    </p>
                  </CardContent>
                  <footer className="flex justify-end p-4">
                    <Button
                      onClick={() => handleSelectUser(user.id)}
                      className={tailwindMerge('rounded-md shadow-md p-2')}
                    >
                      Select
                    </Button>
                  </footer>
                </Card>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <CardTitle>Accounts</CardTitle>
            <div className="grid grid-cols-1 gap-4 xl:gap-6 lg:grid-cols-2 lg:gap-4 md:grid-cols-2 md:gap-4">
              {MOCK_ACCOUNTS.map((account, index) => (
                <Card key={index} className={cardStyles}>
                  <CardHeader>
                    <Avatar size="medium" src={'/image.jpg'} />
                    <div className="ml-4">
                      <CardTitle>{account.name}</CardTitle>
                      <Badge style={badgeStyles}>
                        {account.type === 'Business' ? 'Business' : 'Freelance'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={tailwindMerge('p-4')}>
                    <p className="text-zinc-600">
                      {selectedUser ? selectedUser.id : 'Select User'}
                    </p>
                    <p className="text-zinc-600">
                      {selectedAccount ? selectedAccount.id : 'Select Account'}
                    </p>
                  </CardContent>
                  <footer className="flex justify-end p-4">
                    <Button
                      onClick={() => handleSelectAccount(account.id)}
                      className={tailwindMerge('rounded-md shadow-md p-2')}
                    >
                      Select
                    </Button>
                  </footer>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-end">
          <Input
            type="search"
            placeholder="Search users or accounts"
            className={tailwindMerge('lg:w-1/2 md:w-1/2 w-full')}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className={tailwindMerge('rounded-md shadow-md p-2 bg-zinc-900 text-white hover:bg-zinc-700 ml-2')}
            onClick={() => setModalOpen(true)}
          >
            Open Modal
          </Button>
        </div>
      </CardContent>
      <Modal open={modalOpen}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>One fine body…</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={tailwindMerge('rounded-md shadow-md p-2 bg-zinc-900 text-white hover:bg-zinc-700 mr-2')}
            onClick={() => setModalOpen(false)}
          >
            Close
          </Button>
          <Button
            className={tailwindMerge('rounded-md shadow-md p-2 bg-zinc-900 text-white hover:bg-zinc-700 ml-2')}
            onClick={() => console.log('Submit clicked')}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserAuthenticationPage