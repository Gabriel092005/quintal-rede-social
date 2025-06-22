import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Podcast, Send, User2, Users } from "lucide-react";
import avatar  from '../../../assets/Imagem WhatsApp 2024-08-22 às 13.25.44_ea1fc4c9.jpg'
import { Input } from "@/components/ui/input";


export function Dash(){
    return(
        <div className="flex flex-col ml-52  mt-7">
                <h1 className="tracking-tighter font-bold text-2xl">Dashboard</h1>
                <span className="text-xs">Lorem ipsum dolor sit amet consectetur adipisae itaque ratione culpa quo non qui odio enim.</span>
             <div className="flex flex-row gap-6 mt-5">
                  <div> 
                    <Card>
                       <CardHeader>
                          <CardTitle className="flex items-center">
                             <Send className="text-blue-500"/>
                             Mensages
                          </CardTitle>
                          <CardDescription>Monitore as numero de mensagens</CardDescription>
                       </CardHeader>
                       <CardContent>
                          <h1 className="tracking-tight text-4xl font-bold">+091</h1>
                       </CardContent>
                    </Card>
                  </div>

                   <div> 
                    <Card>
                       <CardHeader>
                          <CardTitle className="flex items-center">
                             <Users className="text-blue-500"/>
                             Usuarios
                          </CardTitle>
                          <CardDescription>Monitore as número de usuários </CardDescription>
                       </CardHeader>
                       <CardContent>
                          <h1 className="tracking-tight text-4xl font-bold">+091</h1>
                       </CardContent>
                    </Card>
                  </div>
                     <div> 
                    <Card>
                       <CardHeader>
                          <CardTitle className="flex items-center">
                             <Podcast className="text-blue-500"/>
                             Posts
                          </CardTitle>
                          <CardDescription>Monitore as numero de mensagens</CardDescription>
                       </CardHeader>
                       <CardContent>
                          <h1 className="tracking-tight text-4xl font-bold">+091</h1>
                       </CardContent>
                    </Card>
                  </div>

                  
             </div>
             <div className="max-w-[82%] mt-3">
                    <Card>
                       <CardHeader>
                          <CardTitle className="flex items-center">
                             <User2 className="text-blue-500"/>
                           USUARIOS
                          </CardTitle>
                          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nemo necessitatibus</CardDescription>
                       </CardHeader>
                      <CardContent className="flex flex-col gap-3 mt-3 overflow-y-auto  px-4 custom-scrollbar scroll-smooth">

                              <Table>
                                <TableHeader>
                                     <TableHead>ID</TableHead>
                                     <TableHead>PHOTO</TableHead>
                                     <TableHead>NOME</TableHead>
                                     <TableHead>E-MAIL</TableHead>
                                     <TableHead className="text-nowrap">REALIZADO HÁ</TableHead>
                                     <TableHead>
                                          <Input placeholder="Pesquisar.."/>
                                     </TableHead>
                                </TableHeader>
                                <TableBody className="">
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>
                                              <Avatar>
                                                  <AvatarImage src={avatar}></AvatarImage>
                                                  <AvatarFallback>US</AvatarFallback>
                                              </Avatar>
                                        </TableCell>
                                        <TableCell className="text-nowrap">Gabriel Manuel</TableCell>
                                        <TableCell>gabrielcavalamanuel@gmail.com</TableCell>
                                        <TableCell className="">5min atras</TableCell>
                                    </TableRow>
                                           <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>
                                              <Avatar>
                                                  <AvatarImage src={avatar}></AvatarImage>
                                                  <AvatarFallback>US</AvatarFallback>
                                              </Avatar>
                                        </TableCell>
                                        <TableCell>Gabriel Manuel</TableCell>
                                        <TableCell>gabrielcavalamanuel@gmail.com</TableCell>
                                        <TableCell className="">5min atras</TableCell>
                                    </TableRow>
                                    

                                    
                                </TableBody>
                              </Table>
                       </CardContent>
                    </Card>
             </div>
             
        </div>
    )
}