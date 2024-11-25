import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/utils/supabase/server"


export default async function page() {
    const supabase = createClient()

    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
        console.error(error)
        return
    }

    const { data, errorProfile } = await supabase
        .from('profiles')
        .select('*, properties(count), businesses(count)')
        .eq('id', user?.id)
        .single()
    // Execute another function after getting the user
    if (error) {
        console.error(error)
        return
    }
    return <div className="container mx-auto">
    </div>
}