'use client'
import { useState } from 'react'
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@gaqno-dev/ui/components/ui'
import { Plus, Trash2, CreditCard } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [inputCode, setInputCode] = useState('')

  const handleAddItem = () => {
    if (!inputCode.trim()) return

    // Mock adding item - in real app this would query the product service
    const newItem: CartItem = {
      id: Math.random().toString(),
      name: `Produto ${inputCode}`,
      price: 10.00,
      quantity: 1
    }
    setCart([...cart, newItem])
    setInputCode('')
  }

  const handleRemoveItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <div className="flex flex-col h-full gap-4 md:flex-row h-[calc(100vh-8rem)]">
       {/* Left: Product List / Search */}
       <div className="flex-1 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
             <CardHeader>
               <CardTitle>Caixa Livre</CardTitle>
             </CardHeader>
             <CardContent className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden">
                <div className="flex gap-2">
                   <Input 
                     placeholder="Código de barras ou nome (Enter para adicionar)" 
                     value={inputCode}
                     onChange={(e) => setInputCode(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                   />
                   <Button onClick={handleAddItem}><Plus className="w-4 h-4 mr-2" /> Adicionar</Button>
                </div>
                
                <div className="flex-1 border rounded-md overflow-auto">
                   <Table>
                      <TableHeader>
                         <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-right">Qtd</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                         {cart.map((item) => (
                           <TableRow key={item.id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.quantity}</TableCell>
                              <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right">R$ {(item.price * item.quantity).toFixed(2)}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                   <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </TableCell>
                           </TableRow>
                         ))}
                         {cart.length === 0 && (
                            <TableRow>
                               <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                  Nenhum item no carrinho
                               </TableCell>
                            </TableRow>
                         )}
                      </TableBody>
                   </Table>
                </div>
             </CardContent>
          </Card>
       </div>

       {/* Right: Totals & Actions */}
       <div className="w-full md:w-[350px] space-y-4">
          <Card>
             <CardHeader>
                <CardTitle>Resumo</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                   <span>Subtotal</span>
                   <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold">
                   <span>Total</span>
                   <span>R$ {total.toFixed(2)}</span>
                </div>
                
                <div className="pt-4 space-y-2">
                   <Button className="w-full" size="lg" disabled={cart.length === 0}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Finalizar Venda
                   </Button>
                   <Button variant="outline" className="w-full" onClick={() => setCart([])} disabled={cart.length === 0}>
                      Cancelar Venda
                   </Button>
                </div>
             </CardContent>
          </Card>
       </div>
    </div>
  )
}

