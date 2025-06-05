import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/primitives/accordion";
import { Button } from "@/components/ui/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";
import { Separator } from "@/components/ui/primitives/separator";
import { Switch } from "@/components/ui/primitives/switch";
import { Textarea } from "@/components/ui/primitives/textarea";
import { Asterisk, BookOpen, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type DatabaseType = {
  connectionName: string;
  hostName: string;
  port: string;
  username: string;
  password: string;
  databaseName: string;
  ssl?: string;
  parameters: {
    key: string;
    value: string;
  }[];
};
function DbDialogContent() {
  const form = useForm<DatabaseType>({
    defaultValues: {
      connectionName: "",
      hostName: "localhost",
      port: "3306",
      username: "root",
      password: "",
      databaseName: "",
      ssl: "no",
      parameters: [],
    },
  });
  const [show, setShow] = useState(false);
  const [useSSL, setUseSSL] = useState(false);
  const [rawJson, setRawJson] = useState(
    JSON.stringify(form.getValues(), null, 2)
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      setRawJson(JSON.stringify(value, null, 2));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = () => {};
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parameters",
  });

  return (
    <div className="database-detail w-full flex">
      <div className="basis-full md:basis-3/4 min-h-0">
        <div className="max-h-[90vh] w-full overflow-auto p-5">
          <div className="max-w-[768px] mx-auto space-y-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <div key="form-section-1" className="space-y-4">
                  <h3 className="text-lg font-semibold">General</h3>
                  <FormField
                    control={form.control}
                    name="connectionName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel aria-required>Connection name<Asterisk color="red" size={9}/></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter connection name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div key="form-section-2" className="space-y-4">
                  <h3 className="text-lg font-semibold">Connection details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="hostName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Host address<Asterisk color="red" size={9}/></FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="port"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port number<Asterisk color="red" size={9}/></FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username<Asterisk color="red" size={9}/></FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={show ? "text" : "password"}
                                {...field}
                              />
                              <Button
                                variant="ghost"
                                onClick={() => setShow((prev) => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                              >
                                {show ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="databaseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Database</FormLabel>
                          <FormControl>
                            <Input placeholder="Database name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div key="form-section-3" className="space-y-2">
                    <FormLabel>Connection parameters</FormLabel>
                    {fields.map((field, index) => (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          key={`parameters.${field.id}.key`}
                          control={form.control}
                          name={`parameters.${index}.key`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  name="key"
                                  placeholder="key"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          key={`parameters.${field.id}.value`}
                          control={form.control}
                          name={`parameters.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Input
                                    {...field}
                                    name="value"
                                    placeholder="value"
                                  />{" "}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    className="max-w-fit"
                                  >
                                    <Trash2 size={20} />
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="secondary"
                      className="border"
                      onClick={() => append({ key: "", value: "" })}
                    >
                      + Add
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
                <div key="form-section-4" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="use-ssl"
                        defaultChecked={useSSL}
                        onCheckedChange={() => {
                          setUseSSL(!useSSL);
                          form.setValue("ssl", "no");
                        }}
                      />
                      <Label htmlFor="use-ssl">Use SSL</Label>
                    </div>
                    {useSSL && (
                      <div className="rounded-lg border p-4">
                        <FormField
                          control={form.control}
                          name="ssl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SSL mode</FormLabel>
                              <FormControl>
                                <Select {...field}>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="no">No</SelectItem>
                                      <SelectItem value="allowed">
                                        Allowed
                                      </SelectItem>
                                      <SelectItem value="preferred">
                                        Preferred
                                      </SelectItem>
                                      <SelectItem value="required">
                                        Required
                                      </SelectItem>
                                      <SelectItem value="required-ca">
                                        Required-CA
                                      </SelectItem>
                                      <SelectItem value="required-identity">
                                        Required-Identity
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="w-fit justify-start">
                        Advanced setting
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="mt-4">
                          <FormLabel className="mb-2 block">Raw JSON</FormLabel>
                          <Textarea
                            className="w-full min-h-[200px] border p-2 rounded font-mono text-sm"
                            value={rawJson}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setRawJson(newValue);
                              try {
                                const parsed = JSON.parse(newValue);
                                form.reset(parsed);
                              } catch (error) {
                                console.warn("Invalid JSON");
                              }
                            }}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="basis-full md:basis-1/4 border-l-1 bg-[#f9f9fa]">
        <div className="flex flex-col p-5 gap-3">
          <div className="text-sm text-gray-800 font-semibold">
            Whitelist IPs
          </div>
          <div className="text-small leading-[18px] text-gray-700">
            Ensure your database has allow-listed the following IPs:
          </div>
          <div className="flex items-center gap-4 cursor-pointer text-gray-800 text-sm font-bold">
            52.15.226.51
            <Button
              className="ant-btn ant-btn-text size-xs theme-default bordered nc-btn-shadow nc-button !px-1"
              type="button"
              variant="ghost"
            >
              <div className="justify-center flex flex-row gap-x-2.5 nc-btn-inner w-full">
                <div className="flex flex-row items-center">
                  <Copy />
                </div>
              </div>
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="text-sm text-gray-800 font-semibold">
            Relevant documentation
          </div>
          <div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a
                href="#"
                className="!text-gray-700 text-sm !no-underline !hover:underline"
              >
                Integrations
              </a>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a
                href="#"
                className="!text-gray-700 text-sm !no-underline !hover:underline"
              >
                Create new connection
              </a>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <a
                href="#"
                className="!text-gray-700 text-sm !no-underline !hover:underline"
              >
                Add new Data source
              </a>
            </div>
          </div>
          <Separator className="my-2" />
        </div>
      </div>
    </div>
  );
}

export default DbDialogContent;
