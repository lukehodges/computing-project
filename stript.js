<div className="grid gap-5 lg:grid-cols-9 sm:grid-cols-2">
            <div className="col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Notifications
                  </CardTitle>
                  <NotificationReadButton data={notifications.map(mapEntityToPrismaNotification)}/>
                  <IconNotification
                    size={16}
                    strokeWidth={2}
                    color="rgb(100, 116, 139)"
                  />
                </CardHeader>
                <CardContent>
                  <div className="w-full max-w-md mx-auto py-4 space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">                        <div className="text-sm font-medium text-muted-foreground">
                          Today
                        </div>
                        <div className="grid gap-4">
                          {hour?.map((notification) =>                             <div
                            className="flex items-start gap-3"
                            key={notification.id}
                          >
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground  ">
                                 <NotificationIcon
                                  className="h-5 w-5"
                                  status={notification.type.toString()}
                                /> 
                              </div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                   {getNotificationText(
                                    notification.type.toString()
                                  )} 
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                 
                                  
                                  { `${(new Date()- notification.createdAt).getMinutes()} minutes ago`}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                          
                                )}
                          
                          {today?.map((notification) => {
                            return (
                              <div
                                className="flex items-start gap-3"
                                key={notification.id}
                              >
                                <div className="flex-shrink-0">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground  ">
                                     <NotificationIcon
                                      className="h-5 w-5"
                                      status={notification.type.toString()}
                                    /> 
                                  </div>
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">
                                       {getNotificationText(
                                        notification.type.toString()
                                      )} 
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                     
                                      
                                      {    `${new Date(
                                          currentTime - notification.createdAt
                                        ).getHours()} hours ago`}
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            )})}
            
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          Yesterday
                        </div>
                        <div className="grid gap-4">
                          {yesterday.map((notification) => {
                            return (
                              <div
                                className="flex items-start gap-3"
                                key={notification.id}
                              >
                                <div className="flex-shrink-0">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground  ">
                                     <NotificationIcon
                                      className="h-5 w-5"
                                      status={notification.type.toString()}
                                    /> 
                                  </div>
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">
                                       {getNotificationText(
                                        notification.type.toString()
                                      )} 
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      {
                                        `${new Date(
                                          currentTime - notification.createdAt
                                        ).getHours()} hours ago` }
                                    </p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          </div>
                    </div>
                  </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Milestones
                    </CardTitle>
                    <SquareArrowOutUpRight
                      size={16}
                      strokeWidth={2}
                      color="rgb(100, 116, 139)"
                    />
                  </div>
                  {/* <CardDescription>This Month</CardDescription> */}
                  <CardTitle className="text-xl font-bold">23.5%</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 pt-0">
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <MultiProgress
                    values={[20, 50, 90]}
                    aria-label="12% increase"
                  />
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-0">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                    <SquareArrowOutUpRight
                      size={16}
                      strokeWidth={2}
                      color="rgb(100, 116, 139)"
                    />
                  </div>
                  {/* <CardDescription>This Month</CardDescription> */}
                  <CardTitle className="text-xl font-bold">75.5%</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 pt-0">
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <Progress value={75.5} aria-label="12% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Client Portal
                  </CardTitle>
                  <SquareArrowOutUpRight
                    size={16}
                    strokeWidth={2}
                    color="rgb(100, 116, 139)"
                  />
                </CardHeader>
              </Card>
              {/* two basic hyperlinks at the bottom to something */}
              <div className="space-y-2">
                <Card className="py-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0">
                    <CardTitle className="text-sm font-medium p-0">
                      Activity Logs
                    </CardTitle>
                    <SquareArrowOutUpRight
                      size={16}
                      strokeWidth={2}
                      color="rgb(100, 116, 139)"
                    />
                  </CardHeader>
                </Card>
                <Card className="py-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0">
                    <CardTitle className="text-sm font-medium p-0">
                      Settings
                    </CardTitle>
                    <SquareArrowOutUpRight
                      size={16}
                      strokeWidth={2}
                      color="rgb(100, 116, 139)"
                    />
                  </CardHeader>
                </Card>
              </div>
            </div>
            <Card className="lg:col-span-7 sm:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-medium">Tasks</CardTitle>
                <SquareArrowOutUpRight
                  size={16}
                  strokeWidth={2}
                  color="rgb(100, 116, 139)"
                />
              </CardHeader>
              <CardContent>
                <DataTable data={tasks.map(TaskUseCases.serializeTask)} columns={columns} editable={true} />
              </CardContent>
            </Card>
          </div>
          